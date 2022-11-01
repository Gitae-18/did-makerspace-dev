'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('service_element_attempt', {
        service_element_attempt_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        service_element_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        attempt_number: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        time_required: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        /*
        equipment_item_no: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        used_material_flag: {
            type: DataTypes.CHAR(1),
            allowNull: true,
            defaultValue: 'N',
        },
        */
        production_method: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        production_specification: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        support_effect: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
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
