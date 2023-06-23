'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        user_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        salt: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        zip: {
            type: DataTypes.CHAR(6),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        address_detail: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        company_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        company_position: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        email_confirm_flag: {
            type: DataTypes.CHAR(1),    // Y or N
            allowNull: false,
            defaultValue: 'N',
        },
        authority_level: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        policy_agree_flag: {
            type: DataTypes.CHAR(1),    // Y or N
            allowNull: false,
        },
        privacy_agree_flag: {
            type: DataTypes.CHAR(1),    // Y or N
            allowNull: false,
        },
        app_login_flag: {
            type: DataTypes.CHAR(1),    // Y or N
            allowNull: false,
            defaultValue: 'N',
        },
        app_push_flag: {
            type: DataTypes.CHAR(1),    // Y or N
            allowNull: false,
            defaultValue: 'N',
        },
        app_push_key: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        auto_login_flag: {
            type: DataTypes.CHAR(1),    // Y or N
            allowNull: false,
            defaultValue: 'N',
        },
        login_jwt: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        login_jwt_exfire: {
            type: DataTypes.DATE,
            allowNull: true,
        },
       /*  equip_test_flag: {
            tpye:DataTypes.CHAR(1),
            allowNull:false,
        }, */
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
        comment: '사용자',
    });
};