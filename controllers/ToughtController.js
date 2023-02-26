const Tought = require('../models/Tought')
const User = require('../models/User')
const { Op } = require('sequelize')

module.exports = class ToughtController {
    static async showToughts(req, res) {

        let search = ''

        if(req.query.search){
            search = req.query.search
        }

        let order = ''

        if(req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where:{
                title:{[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]]
        })

        const toughts = toughtsData.map((result) => result.get({plain:true}))

        let toughtsQty = toughts.length

        if(toughtsQty === 0) {
            toughtsQty = false
        }

        res.render('toughts/home', {toughts, search, toughtsQty})
    }

    static makeTought(req, res) {
        res.render('toughts/make')
    }

    static async toughtSave(req, res) {
        
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso')

            req.session.save(() => {
                res.redirect('/user/profile')
            })
        } catch (err) {
            console.log(err)
        }
    }

    static async editTought(req, res) {
        const id = req.params.id

        try {
            const tought = await Tought.findOne({ where:{id:id}, raw:true})

            req.session.save(() => {
                res.render('toughts/edit', {tought})
            })
        } catch (err) {
            console.log(err)
        }
    }

    static async editToughtSave(req, res) {
        const id = req.body.id

        const tought = {
            title: req.body.title
        }

        try {
            await Tought.update(tought, {where:{id:id}})

            req.flash('message', 'Pensamento editado com sucesso')

            req.session.save(() => {
                res.redirect('/user/profile')
            })
        }catch(err){
            console.log(err)
        }
    }

    static async deleteTought(req, res) {
        console.log(req.body)
        const id = req.body.id

        const UserId = req.session.userid

        try {
            await Tought.destroy({where:{id:id, UserId:UserId}})

            req.flash('message', 'Pensamento excluido com sucesso')

            req.session.save(() => {
                res.redirect('/user/profile')
            })
        }catch(err){
            console.log(err)
        }
    }
}