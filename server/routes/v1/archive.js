'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('archive', {
        archive_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        file_type:{
            type: DataTypes.CHAR(5),
            allowNull:false,
        },
        hit:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0,
        },
        attached_file:{
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        content:{
            type: DataTypes.STRING(255),
            allowNull:false,
        },
        title:{
            type: DataTypes.STRING(255),
            allowNull:false,
        },
        src:{
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        url:{
            type: DataTypes.STRING(255),
            allowNull:true,
        }
        ,
        created_user_no: {
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        updated_user_no:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
    },{
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '자료실',
    }
    )}