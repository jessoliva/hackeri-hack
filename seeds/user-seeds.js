const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'flash',
    password:'password1122',
    email:'flash@ut.com',
  },
  {
    username:'peke',
    password:'password1122',
    email:'peke@ut.com'
  },
  {
    username:'mini',
    password:'password1122',
    email:'mini@ut.com'
  },
  {
    username:'jedi',
    password:'password1122',
    email:'jedi@ut.com'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
