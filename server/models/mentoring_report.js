'use strict';

module.exports = (sequelize,DataTypes) => {
    return sequelize.define ('mentoring_report',{
        mentoring_report_no:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
        },
        mentoring_application_no: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        user_no: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        report_content:{
            type:DataTypes.TEXT,
            allowNull:false,
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