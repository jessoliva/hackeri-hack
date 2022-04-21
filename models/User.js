// import the Model class and DataTypes object from Sequelize
const { Model, DataTypes } = require('sequelize');
// connection to MySQL we stored in the connection.js
const sequelize = require('../config/connection');
// to hash passwords to protect them!
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // checks password at login to user's password
    pwCheck(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

// define the User model's table columns and configurations
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true // no duplicate usernames
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // no duplicate emails
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6] // password must be at least 6 characters
            }
        }
    },
    {  
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            // async/await syntax
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },   
        sequelize,
        timestamps: false, // don't create createdAt/updatedAt timestamp fields
        freezeTableName: true, // prevent pluralization of table name
        underscored: true, // use underscores instead of camelCase
        modelName: 'user'
    }
);

module.exports = User;