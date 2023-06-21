'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mentor', {
            mentor_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
            user_no: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            permission_flag: {
                type: DataTypes.CHAR(5),
                allowNull: false,
                defaultValue:'N',
            },
            keyword: {
                type: DataTypes.STRING(55),
                allowNull:false,
            },
           mentor_profile: {
                type: DataTypes.STRING(500),
                allowNull:true,
           },
           career: {
                type: DataTypes.TEXT,
                allowNull:true,
           },
           field: {
                type: DataTypes.STRING(55),
                allowNull:true,
           },
           created_user_no: {
                type: DataTypes.INTEGER,
                allowNull:true,
           },
           updated_user_no: {
                type: DataTypes.INTEGER,
                allowNull:true,
           }

    },{
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '멘토 리스트',
    })
}