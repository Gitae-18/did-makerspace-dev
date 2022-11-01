'use strict';



module.exports = (sequelize, DataTypes) => {
    return sequelize.define('service_application', {
        service_no: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true,
        },
        service_categories_no: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        business_plan: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        requirement: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        attached_file_flag: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            defaultValue: 'N',
        },
        created_user_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updated_user_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        memo:{
            type:DataTypes.CHAR(200),
            allowNull:true,
        }
    }, {
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '서비스 신청서',
    });
};
