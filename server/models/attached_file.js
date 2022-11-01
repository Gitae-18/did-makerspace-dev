'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('attached_file', {
        attached_file_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        service_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        added_position: {
            type: DataTypes.CHAR(2),
            allowNull: false,
        },
        service_element_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        original_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        type: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        filesize: {
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
        comment: '첨부파일',
    });
};
