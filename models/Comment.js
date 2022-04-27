const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { // ensure that a comment has at least one character
                len: [1]
            }

        },
        can_delete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        user_id: { // used to create relationship between user table and comment table
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: { // used to create relationship between post table and comment table
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;