const {DataTypes} = require('sequelize')
const sequelize = require('../db/conn')

const db = require('../db/conn')

const User = db.define('User', {

    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
    pic_profile: {
        type: DataTypes.BLOB,
        require: true
    },
    pic_cover: {
        type: DataTypes.BLOB,
        require: true
    },
    bio_profile: {
        type: DataTypes.STRING,
        require: true
    },
    location_profile: {
        type: DataTypes.STRING,
        require: true
    },
    link_profile: {
        type: DataTypes.STRING,
        require: true
    }


})

module.exports = User