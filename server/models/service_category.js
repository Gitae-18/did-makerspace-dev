'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('service_category', {
        service_category_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            
        },
        service_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        company_no: {
            type: DataTypes.INTEGER,
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
        comment: '서비스 항목',
    });
};
