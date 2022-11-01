'use strict';

module.exports = (sequelize,DataTypes) => {
    return sequelize.define ('mentoring_compliment',{
        mentor_compliment_no: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
        },
        mentor_no: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        compliment_text: {
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        star_rating: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        hit: {
            type: DataTypes.INTEGER,
            allowNull:false,
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
        comment: '멘토 칭찬',
    })
}