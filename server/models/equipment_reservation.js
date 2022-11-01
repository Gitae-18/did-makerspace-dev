'use strict';

module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('equipment_reservation',{
        equipment_reservation_no:{
            type:DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true,
        },
        equipment_element_no:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true,
        },
        equipment_category_no:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        reservation_status:{
            type:DataTypes.CHAR(5),
            allowNull:false,
        },
        reservation_date:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        created_user_no:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        updated_user_no:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    },{
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '장비예약',
    })
}