'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exam_question', {
        question_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        question_title:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
        answer:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
        pic_src:{
            type: DataTypes.STRING(255),
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
        comment: '시험문제',
    }
    )}