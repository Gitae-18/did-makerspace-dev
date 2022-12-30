'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('classedu_application', {
        application_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        classedu_type:{
            type: DataTypes.CHAR(5),
            allowNull: false,
        },
        title:{
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        flag:{
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
        }
    },{
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '교육행사프로그램신청',
    }
    )}