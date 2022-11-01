'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('service_element', {
        service_element_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        service_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        service_category_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        /*
        attempt_number: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        time_required: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        production_method: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        equipment_item_no: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        used_material_flag: {
            type: DataTypes.CHAR(1),
            allowNull: true,
            defaultValue: 'N',
        },
        production_specification: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        support_effect: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        */
        support_content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        support_result: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        /*
        attached_file_flag: {
            type: DataTypes.CHAR(1),
            allowNull: true,
            defaultValue: 'N',
        },
        */
        created_user_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updated_user_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '서비스 항목별 진행',
    });
};
