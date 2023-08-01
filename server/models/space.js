'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('space', {
        space_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        space_name:{
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        space_part:{
            type: DataTypes.STRING(55),
            allowNull:true,
        },
        space_info:{
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        location:{
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        src:{
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        src2:{
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        available:{
            type: DataTypes.CHAR(1),
            allowNull:true,
        },
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
        comment: '공간',
    }
    )}