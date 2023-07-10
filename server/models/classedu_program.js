'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('classedu_program', {
        program_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        type:{
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        hit:{
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0,
        },
        attached_file:{
            type: DataTypes.CHAR(5),
            allowNull:true,
            defaultValue:"N",
        },
        class_period_start:{
            type:DataTypes.STRING(255),
            allowNUll:false,
        },
        class_period_end:{
            type:DataTypes.STRING(255),
            allowNUll:false,
        },
        application_period_start:{
            type:DataTypes.STRING(255),
            allowNUll:false,
        },
        application_period_end:{
            type:DataTypes.STRING(255),
            allowNUll:false,
        },
        content:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
        title:{
            type: DataTypes.STRING(55),
            allowNull:true,
        },
        cost:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        pay_flag:{
            type: DataTypes.CHAR(1),
            allowNull:false,
            defaultValue:"N",
        },
        place:{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        limit_number:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        map_url:{
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        img_style:{
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        attached_file:{
            type: DataTypes.STRING(255),
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
        popup_flag:{
            type: DataTypes.CHAR(1),
            allowNull:true,
            defaultValue:"N",
        }
    },{
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '교육행사프로그램 추가',
    }
    )}