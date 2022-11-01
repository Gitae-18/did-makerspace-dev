'use strict';

module.exports = (sequelize,DataTypes) => {
    return sequelize.define ('mentoring',{
        mentoring_no:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
        },
        user_no:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        mentor_no:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        session:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        title:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        status:{
            type:DataTypes.CHAR(5),
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
    },
        {   
            uderscored:false,
            timestamps: true, // created_at, updated_at
            paranoid: true,    // deleted_at
            underscored: true,
            charset: 'utf8',
            comment: '멘토링',
        });
}