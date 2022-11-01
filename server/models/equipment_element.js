'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('equipment_element', {
        equipment_element_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        equipment_category_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        company_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        serial_number: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        asset_flag: {
            type: DataTypes.CHAR(1),    // Y or N
            allowNull: false,
            defaultValue: 'Y',
        },
        ip: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        port: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        note_content: {
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
        comment: '기자재 요소',
    });
};
