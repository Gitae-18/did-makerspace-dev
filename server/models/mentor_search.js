'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mentor_search', {
            mentor_search_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        
        mentoring_category_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mentor_no:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        updated_user_no:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_user_no:{
            type:DataTypes.INTEGER,
            allowNull: false,
        }        
    },{
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '멘토 검색',
    })
}