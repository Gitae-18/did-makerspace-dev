'use strict';
const { MaterialItem, MaterialUsage, Company, ServiceElementAttempt, AttachedFile }= require('../models');
const { verifyToken, errorCode, authLevel, upload, makedir } = require('./middlewares');

async function FindMaterialItem(material_item_no) {
    let findResult;
    try {
        findResult = await MaterialItem.findOne({
            where: { material_item_no }
        });
    } catch (error) {
        console.error(error);
        return undefined;
    }

    return findResult;
}

async function FindMaterialUsage(material_usage_no) {
    let findResult;
    try {
        findResult = await MaterialUsage.findOne({
            where: { material_usage_no }
        });
    } catch (error) {
        console.error(error);
        return undefined;
    }

    return findResult;
}

async function AddMaterialUsage(user_no, service_element_no, material_item_no, sortation, quantity, request_content) { 

    // 1. find material item
    const findResult = await FindMaterialItem(material_item_no);
    if (!findResult) { return errorCode.internalServerError; }

    // 2. create usage
    let inputResult;
    try {
        inputResult = await MaterialUsage.create({
            material_item_no,
            sortation,
            service_element_no,
            quantity,
            request_content: request_content,
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        console.error(error);
        return errorCode.internalServerError;
    }

    if (!(inputResult instanceof MaterialUsage)) {
        return errorCode.internalServerError;
    }
    
    // 3. update, sotck in item
    if (sortation === 'USE') {
        const oldStock = findResult.dataValues.quantity;
        const newStock = oldStock - quantity;

        let updateResult;
        try {
            updateResult = await MaterialItem.update({
                quantity: newStock,
                updated_user_no: user_no,
            }, {
                where: { material_item_no },
            });
        } catch (error) {
            console.error(error);
            return errorCode.internalServerError;
        }
    }

    return errorCode.noContent;
}

async function UpdateMaterialUsage(user_no, service_element_no, registered_usage_no, new_item_no, new_quantity) { 

    if (!registered_usage_no) { // 이 전에 자재사용이 없었음, 새로 생성필요
        if (!new_item_no) { // 현재도 자재 사용 없음 
            // 할게 없음 리턴
            return errorCode.ok;
        } else { // 새로 생성필요
            return await AddMaterialUsage(user_no, service_element_no, new_item_no, "USE", new_quantity, undefined); 
        }
    } else {    // 이 전에 자재사용이 있었음
        // find material usage
        const usage_table = await FindMaterialUsage(registered_usage_no);
        if (!usage_table) { return errorCode.internalServerError; }

        const last_quantity = usage_table.dataValues.quantity;
        const last_item_no = usage_table.dataValues.material_item_no;

        if (new_item_no) {    // 자재사용이 있는 경우
            if (new_item_no == last_item_no) {  // 신규 자재와 이전 자재가 같으면 수량만 변경
                if (last_quantity == new_quantity) {    // 이전 자재 사용량과 신규 자재 사용량이 같으면 할 일 없음
                    return errorCode.ok;
                } else {    // 자재 사용량 업데이트
                    // find material item
                    const item_table = await FindMaterialItem(new_item_no);
                    if (!item_table) { return errorCode.internalServerError; }

                    const oldStock = item_table.dataValues.quantity;
                    const newStock = oldStock + (last_quantity - new_quantity);

                    // 2.2 남아있는 자재에 이번에 사제한 자재사용에 대한 것을 롤백함
                    let updateResult;
                    try {
                        updateResult = await MaterialItem.update({
                            quantity: newStock,
                            updated_user_no: user_no,
                        },{
                            where: { material_item_no: new_item_no }
                        });
                    } catch (error) {
                        console.error(error);
                        return errorCode.internalServerError;
                    }

                    // 2.3 자재 사용량 업데이트
                    try {
                        updateResult = await MaterialUsage.update({
                            quantity: new_quantity,
                            updated_user_no: user_no,
                        },{
                            where: { material_usage_no: registered_usage_no }
                        });
                    } catch (error) {
                        console.error(error);
                        return errorCode.internalServerError;
                    }
                }
            } else {    // 신규 자재와 이전 자재가 다름, 자재와 수량 모두 변경 필요
                // 2.1 자재사용 내역을 삭제하고
                let deleteResult;
                try {
                    deleteResult = await MaterialUsage.destroy({
                        where: { material_usage_no: registered_usage_no }
                    });
                } catch (error) {
                    console.error(error);
                    return errorCode.internalServerError;
                }

                // find material item
                const item = await FindMaterialItem(last_item_no);
                if (!item) { return errorCode.internalServerError; }

                const oldStock = item.dataValues.quantity;
                const newStock = oldStock + last_quantity;

                // 2.2 남아있는 자재에 이번에 사제한 자재사용에 대한 것을 롤백함
                let updateResult;
                try {
                    updateResult = await MaterialItem.update({
                        quantity: newStock,
                        updated_user_no: user_no,
                    },{
                        where: { material_item_no: last_item_no }
                    });
                } catch (error) {
                    console.error(error);
                    return errorCode.internalServerError;
                }

                return await AddMaterialUsage(user_no, service_element_no, new_item_no, "USE", new_quantity, undefined); 
            }
        } else { // 자재사용 없음, 자재사용 삭제 필요
            // 2.1 자재사용 내역을 삭제하고
            let deleteResult;
            try {
                deleteResult = await MaterialUsage.destroy({
                    where: { material_usage_no: registered_usage_no }
                });
            } catch (error) {
                console.error(error);
                return errorCode.internalServerError;
            }

            // find material item
            const item = await FindMaterialItem(last_item_no);
            if (!item) { return errorCode.internalServerError; }

            const oldStock = item.dataValues.quantity;
            const newStock = oldStock + last_quantity;

            // 2.2 남아있는 자재에 이번에 사제한 자재사용에 대한 것을 롤백함
            let updateResult;
            try {
                updateResult = await MaterialItem.update({
                    quantity: newStock,
                    updated_user_no: user_no,
                },{
                    where: { material_item_no: last_item_no }
                });
            } catch (error) {
                console.error(error);
                return errorCode.internalServerError;
            }
        }
    }

    return errorCode.ok;
}

async function UpdateMaterialItemQuantity(user_no, material_item_no, value) {
    const findResult = await FindMaterialItem(material_item_no);
    if (!findResult) { return errorCode.internalServerError; }

    const newQuantity = findResult.dataValues.quantity + value;
    let updateResult;
    try {
        updateResult = await MaterialItem.update({
            quantity: newQuantity,
            updated_user_no: user_no,
        }, {
            where: { material_item_no },
        });
    } catch (error) {
        console.error(error);
        return errorCode.internalServerError;
    }

    return errorCode.ok;
}

async function AddServiceElementAttempt(user_no, service_element_no, attempt_data) { 
    let service_element_attempt_no = Number(attempt_data.service_element_attempt_no);
    if (service_element_attempt_no > 0) {
        let updateResult;
        try {
            updateResult = await ServiceElementAttempt.update({
                attempt_number: attempt_data.attempt_number,
                time_required: attempt_data.time_required,
                production_method: attempt_data.production_method,
                production_specification: attempt_data.production_specification,
                support_effect: attempt_data.support_effect,
                updated_user_no: user_no,
            }, {
                where: { service_element_attempt_no },
            });
        } catch (error) {
            console.error(error);
            return undefined;
        }
    } else {
        let inputResult;
        try {
            inputResult = await ServiceElementAttempt.create({
                service_element_no,
                attempt_number: attempt_data.attempt_number,
                time_required: attempt_data.time_required,
                production_method: attempt_data.production_method,
                production_specification: attempt_data.production_specification,
                support_effect: attempt_data.support_effect,
                created_user_no: user_no,
                updated_user_no: user_no,
            });
        } catch (error) {
            console.error(error);
            return undefined;
        }

        if (!(inputResult instanceof ServiceElementAttempt)) {
            return undefined;
        }

        service_element_attempt_no = inputResult.dataValues.service_element_attempt_no;
    }

    return service_element_attempt_no;
}

async function AddEquipAndMaterialUsage(user_no, service_element_attempt_no, sortation, equip_data) { 
    const material_usage_no = equip_data.material_usage_no;
    const material_item_no = equip_data.material_item_no;
    const equipment_category_no = equip_data.equipment_category_no;
    const quantity = equip_data.quantity;

    if (material_usage_no > 0) {    // update
        let findResult = await FindMaterialUsage(material_usage_no)   // find old
        if (!findResult) {
            return errorCode.internalServerError;
        }

        const old_material_item_no = findResult.material_item_no;
        const old_equip_category_no = findResult.equipment_category_no;
        const old_quantity = findResult.quantity;

        let updateResult;
        try {
            updateResult = await MaterialUsage.update({
                material_item_no: (material_item_no ? material_item_no : 0),
                sortation,
                service_element_attempt_no,
                equipment_category_no,
                quantity,
                updated_user_no: user_no,
            }, {
                where: { material_usage_no },
            });
        } catch (error) {
            console.error(error);
            return errorCode.internalServerError;
        }

        if (material_item_no != old_material_item_no) {
            if (old_material_item_no > 0 && old_quantity > 0) {
                const rst = await UpdateMaterialItemQuantity(user_no, old_material_item_no, old_quantity);
                if (rst != errorCode.ok) { return rst; }
            }

            // update, sotck in item
            if (material_item_no > 0 && quantity > 0) {
                const rst = await UpdateMaterialItemQuantity(user_no, material_item_no, -quantity);
                if (rst != errorCode.ok) { return rst; }
            }
        } else {
            const newQuantity = old_quantity - quantity;
            if (material_item_no > 0 && newQuantity != 0) {
                const rst = await UpdateMaterialItemQuantity(user_no, material_item_no, newQuantity);
                if (rst != errorCode.ok) { return rst; }
            }
        }
   } else {    // create usage
        let inputResult;
        try {
            inputResult = await MaterialUsage.create({
                material_item_no: (material_item_no ? material_item_no : 0),
                sortation,
                service_element_attempt_no,
                equipment_category_no,
                status: (sortation === 'USE') ? 'END' : 'URD',
                quantity,
                created_user_no: user_no,
                updated_user_no: user_no,
            });
        } catch (error) {
            console.error(error);
            return errorCode.internalServerError;
        }

        if (!(inputResult instanceof MaterialUsage)) {
            return errorCode.internalServerError;
        }

        // update, sotck in item
        if (material_item_no > 0 && quantity > 0) {
            const rst = await UpdateMaterialItemQuantity(user_no, material_item_no, -quantity);
            if (rst != errorCode.ok) { return rst; }
        }
    }

    return errorCode.ok;
}

async function RemoveEquipAndMaterialUsage(user_no, material_usage_no) { 

    let findResult = await FindMaterialUsage(material_usage_no)   // find old
    if (!findResult) {
        return errorCode.internalServerError;
    }

    const old_material_item_no = findResult.material_item_no;
    const old_equip_category_no = findResult.equipment_category_no;
    const old_quantity = findResult.quantity;

    if (old_material_item_no > 0 && old_quantity > 0) {
        const rst = await UpdateMaterialItemQuantity(user_no, old_material_item_no, old_quantity);
        if (rst != errorCode.ok) { return rst; }
    }

    let deleteResult;
    try {
        deleteResult = await MaterialUsage.destroy({
            where: { material_usage_no }
        });
    } catch (error) {
        console.error(error);
        return errorCode.internalServerError;
    }

    return errorCode.ok;
};

module.exports.FindMaterialItem = FindMaterialItem;
module.exports.AddMaterialUsage = AddMaterialUsage;
module.exports.UpdateMaterialUsage = UpdateMaterialUsage;

module.exports.AddServiceElementAttempt = AddServiceElementAttempt;
module.exports.AddEquipAndMaterialUsage = AddEquipAndMaterialUsage;
module.exports.RemoveEquipAndMaterialUsage = RemoveEquipAndMaterialUsage;
