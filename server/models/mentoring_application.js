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
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        application_title: {
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        specific_content: {
            type: DataTypes.STRING(500),
            allowNull:true,
        },
        match_type: {
            type: DataTypes.STRING(55),
            allowNull: false,
            defaultValue:'online'
        },
        privacy_agree_flag: {
            type: DataTypes.CHAR(5),
            allowNull: false,
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