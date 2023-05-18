'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('workers', {
        worker_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        
        indp: {
            type: DataTypes.STRING(55),
            allowNull: true,
        },
        name:{
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        info:{
            type: DataTypes.STRING(55),
            allowNull: true,
        }     
    },{
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '운영인력',
    })
}