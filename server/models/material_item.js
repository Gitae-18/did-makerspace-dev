'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('material_item', {
        material_item_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        material_category_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false,
        },
        equipment_category_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        unit: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        company_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        seller: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        comment: {
            type: DataTypes.STRING(100),
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
        comment: '자재 항목',
    });
};
