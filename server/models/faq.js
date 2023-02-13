'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('faq', {
        faq_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(55),
            allowNull: false,
        },
       content:{
            type: DataTypes.TEXT,
            allowNull:false,
       },
       attached_file:{
            type: DataTypes.STRING(255),
            allowNull:true,
       },
       hit:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0,
       },
       filesurl:{
            type: DataTypes.STRING(255),
            allowNull:true,   
       },
        created_user_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updated_user_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: 'faq',
    });
};
