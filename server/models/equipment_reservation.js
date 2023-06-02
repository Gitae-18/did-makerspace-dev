'use strict';

module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('equipment_reservation',{
        equipment_reservation_no:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        equipment_category_no:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        user_no:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        reservation_status:{
            type:DataTypes.CHAR(5),
            allowNull:false,
            defaultValue:'can'
        },
        reservation_date:{
            type:DataTypes.STRING(50),
            allowNull:false,
        },
        reservation_time:{
            type:DataTypes.STRING(30),
            allowNull:false,
        },
        created_user_no:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        updated_user_no:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
    },{
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '장비예약',
    })
}