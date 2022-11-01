'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('consulting_application', {
        service_no: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reservation_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        attached_file_flag: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            defaultValue: 'N',
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
        comment: '상담 신청서',
    });
};
