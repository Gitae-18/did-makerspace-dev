'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('alarm_log', {
        alarm_log_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        sender_user_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        recipient_user_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.CHAR(3),
            allowNull: false,
            defaultValue: 'URD',
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
        comment: '알람 로그',
    });
};
