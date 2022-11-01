'use strict';

module.exports = (sequelize,DataTypes) => {
    return sequelize.define ('mentoring_category',{
        mentoring_category_no: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
        },
        mentoring_category_name: {
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        mentor_no: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        created_user_no: {
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        updated_user_no: {
            type: DataTypes.INTEGER,
            allowNull:true,
        },
    },{
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '멘토링 항목',
    }
    )}