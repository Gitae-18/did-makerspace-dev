'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('material_category', {
        material_category_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        code: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        created_user_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updated_user_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: true, // created_at, updated_at
        paranoid: true,    // deleted_at
        underscored: true,
        charset: 'utf8',
        comment: '자재 분류',
    });
};
