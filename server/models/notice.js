'use strict';

module.exports = (sequelize,DataTypes) => {
    return sequelize.define ('notice',{
        notice_no:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
        },
        user_no:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        attached_file:{
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        title:{
            type: DataTypes.STRING(55),
            allowNull:false,
        },
        hit:{
            type: DataTypes.INTEGER,
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
        comment: '공지사항',
    })
}