const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Ok')
}catch(err){
    console.log(`Fail: ${err}`)
}

module.exports = sequelize