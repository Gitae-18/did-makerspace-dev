'use strict';

module.exports = (sequelize,DataTypes) => {
    return sequelize.define ('mentor_application',{
        mentor_application_no: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
        },
        user_no: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        name: {
            type: DataTypes.STRING(55),
            allowNull:true,
        },
        department: {
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        final_education: {
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        major: {
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        specialization: {
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        keyword: {
            type: DataTypes.STRING(55),
            allowNull:true,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        reject: {
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        status: {
            type: DataTypes.CHAR(10),
            allowNull:false,
            defaultValue:'A',
        },
        text:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
        email:{
            type: DataTypes.STRING(55),
            allowNull:true,
        },
        phone_number:{
            type: DataTypes.STRING(55),
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
        comment: '전문멘토 신청서',
    }
    )
}