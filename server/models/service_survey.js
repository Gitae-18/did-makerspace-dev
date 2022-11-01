'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('service_survey', {
        service_no: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true,
        },
        answer_numbers: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        answer_text: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        comment: '설문지',
    });
};
