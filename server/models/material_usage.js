'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('material_usage', {
        material_usage_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        material_item_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sortation: {
            type: DataTypes.CHAR(3),
            allowNull: false,
        },
        /*
        service_element_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        */
        service_element_attempt_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        equipment_category_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        status: {
            type: DataTypes.CHAR(3),
            allowNull: false,
            defaultValue: 'URD',
        },
        request_content: {
            type: DataTypes.TEXT('tiny'),
            allowNull: true,
        },
        reject_content: {
            type: DataTypes.TEXT('tiny'),
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
        comment: '자재 이용',
    });
};
