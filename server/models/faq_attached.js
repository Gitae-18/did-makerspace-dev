'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('faq_attached_file', {
        attached_file_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        faq_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        original_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(100),
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
        filesurl:{
            type: DataTypes.BLOB("long"),
            allowNull:true,   
            defaultValue:"/images/Noimg.png",
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
