'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('company', {
        company_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        registration_number: {
            type: DataTypes.CHAR(10),
            allowNull: false,
        },
        telephone_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        business_field: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        zip: {
            type: DataTypes.CHAR(6),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        address_detail: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        partner_flag: {
            type: DataTypes.CHAR(1),    // Y or N
            allowNull: false,
            defaultValue: 'N',
        },
        user_no: {
            type: DataTypes.INTEGER,
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
        comment: '기업',
    });
};
