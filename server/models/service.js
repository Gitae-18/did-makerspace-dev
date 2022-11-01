'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('service', {
        service_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        user_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        consulting_flag:{
            type: DataTypes.CHAR(1),
            allowNull: false,
            defaultValue: 'N',
        },
        progress: {
            type: DataTypes.CHAR(7),
            allowNull: false,
            defaultValue: 'STEP_01',
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
        comment: '서비스',
    });
};
