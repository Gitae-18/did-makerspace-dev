'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('service_application_confirm', {
        service_no: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true,
        },
        confirm_flag: {
            type: DataTypes.CHAR(1),
            allowNull: true,
        },
        request_content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        reject_content: {
            type: DataTypes.TEXT('tiny'),
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
       
    }, {
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '서비스 신청서 확인',
    });
};
