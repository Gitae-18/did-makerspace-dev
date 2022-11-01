'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('old_service', {
        old_service_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        application_title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        application_field: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        customer: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        company_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        registration_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        completion_date: {
            type: DataTypes.DATE,
            allowNull: false,
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
        comment: '(구) 서비스 항목',
    });
};
