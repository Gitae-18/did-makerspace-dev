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
        birth: {
            type: DataTypes.STRING(55),
            allowNull:false
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