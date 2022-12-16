'use_strict';

module.exports = (sequelize,DataTypes) => {
    /*await queryInterface.addConstraint('user_no',{
        fields:['user_no'],
        type: "foreign key",
        name: "user_no_fk",
        references: {
            table: "user",
            field : "user_no",
        },
        onDelete:"cascade",
        onUpdate:"cascade",
    });*/
    return sequelize.define('user_equipment_test_pass',{
        test_pass_no:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        user_no:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        type:{
            type:DataTypes.STRING(55),
            allowNull:false,
        },
        pass_flag:{
            type:DataTypes.CHAR(3),
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
        comment: '유저장비테스트',
    })
}