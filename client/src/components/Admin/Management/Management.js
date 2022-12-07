import React from "react";
import{Routes,Route,BrowserRouter,Link} from 'react-router-dom'
import ManagementCompany,{ManagementEquipCategory,ManagementEquipment,ManagementMaterial,ManagementMaterialDepart,ManagementMaterialItem,ManagementMember,ManagementServiceCateogry} from "../../pages/PageSub6";
import MaterialItem from "../Material/MaterialItem";
import MaterialList from "../Material/MaterialList";
import MaterialReg from "../Material/MaterialReg";
import EquipmentCategoryEdit from "./EquipmentCategoryEdit";
import EquipmentCategoryReg from "./EquipmentCategoryReg";
import EquipmentEdit from "./EquipmentEdit";
import EquipmentReg from "./EquipmentReg";
import MaterialCategoryEdit from "./MaterialCategoryEdit";
import MaterialCategoryReg from "./MaterialCategoryReg";
import MaterialItemEdit from "./MaterialItemEdit";
import MaterialItemReg from "./MaterialItemReg";
import ServiceCategoryEdit from "./ServiceCategoryEdit";
import ServiceCategoryReg from "./ServiceCategoryReg";
import SubSideMenu from "../../contents/SubSideMenu";
import Company from "./Company";

export default function Management(){
    return(
    <>
    <Routes>
    <Route path="/management/mcompany" element={<ManagementCompany/>}/>
    <Route path="/management/member" element={<ManagementMember/>}/>
    <Route path="/management/ecategory" element={<ManagementEquipCategory/>}/>
                 <Route path="/management/ecategory/eEdit" element={<EquipmentCategoryEdit/>}/>
                 <Route path="/management/ecategory/eReg" element={<EquipmentCategoryReg/>}/>
    <Route path="/management/equipment" element={<ManagementEquipment/>}/>
                 <Route path="/management/equipment/edit" element={<EquipmentEdit/>}/>
                 <Route path="/management/equipment/reg" element={<EquipmentReg/>}/>
    <Route path="/management/material" element={<ManagementMaterial/>}/>
                 <Route path="/management/material/item" element={<MaterialItem/>}/>
                 <Route path="/management/material/list" element={<MaterialList/>}/>
                 <Route path="/management/material/reg" element={<MaterialReg/>}/>
    <Route path="/management/mdepart" element={<ManagementMaterialDepart/>}/>
                 <Route path="/management/mdepart/edit" element={<MaterialCategoryEdit/>}/>
                 <Route path="/management/mdepart/reg" element={<MaterialCategoryReg/>}/>
    <Route path="/management/mitem" element={<ManagementMaterialItem/>}/>
                 <Route path="/management/mitem/edit" element={<MaterialItemEdit/>}/>
                 <Route path="/management/mitem/reg" element={<MaterialItemReg/>}/>
    <Route path="/management/servicecategory" element={<ManagementServiceCateogry/>}/>
                 <Route path="/management/servicecategory/eidt" element={<ServiceCategoryEdit/>}/>
                 <Route path="/management/servicecategory/reg" element={<ServiceCategoryReg/>}/>
    </Routes>
    </>
    )
}