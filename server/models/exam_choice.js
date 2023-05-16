'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exam_choice', {
        choice_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        content:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
        question_no:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
       exam_type:{
            type: DataTypes.INTEGER,
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
        comment: '시험보기',
    }
    )}