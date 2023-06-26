'use strict';

module.exports = (sequelize,DataTypes) => {
    return sequelize.define ('mentoring_application',{
        mentoring_application_no: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
        },
        user_no: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        requirement: {
            type: DataTypes.TEXT,
            allowNull:true,
        },
        purpose: {
            type: DataTypes.STRING(255),
            allowNull:false,
        },
        application_title: {
            type: DataTypes.STRING(500),
            allowNull:false,
        },
        specific_content: {
            type: DataTypes.TEXT,
            allowNull:true,
        },
        part:{
            type: DataTypes.STRING(55),
            allowNull:true,
        },
        represent:{
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        sub:{
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        company_name:{
            type: DataTypes.STRING(255),
            allowNull:false,
        },
        email:{
            type: DataTypes.STRING(255),
            allowNull:false,
        },
        name:{
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        tel_num:{
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        p_num:{
            type: DataTypes.STRING(55),
            allowNull:true,
        },
        usermail:{
            type: DataTypes.STRING(255),
            allowNull:false,
        },
        address:{
            type: DataTypes.STRING(255),
            allowNull:false,
        },
        address_detail:{
            type: DataTypes.STRING(255),
            allowNull:true,
        },  
        mentor:{
            type: DataTypes.STRING(55),
            allowNUll:false,
        },
        status:{
            type: DataTypes.STRING(55),
            allowNUll:false,
            defaultValue:"신청",
        },
        created_user_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updated_user_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    },{
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '멘토링 신청서',
    }
    )
}