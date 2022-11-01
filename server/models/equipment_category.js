'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('equipment_category', {
        equipment_category_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        service_category_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false,
        },
        model_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        model_number: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        model_specification: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        purpose: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        model_specific_detail:{
            type: DataTypes.STRING(500),
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
        comment: '기자재 항목',
    });
};
