const User = require('../models/User')
const Tought = require('../models/Tought')

module.exports = class UserController {
    static async profile(req, res) {
        const userId = req.params.id

        const tought = await User.findAll({where:{id:userId}, include: Tought, order: [['createdAt', 'DESC']], raw:true, nest: true})

        const user = tought[0]

        res.render('user/profile', {user, tought})
        
    }

    static async userProfile(req, res) {

        const userId = req.session.userid

        const tought = await User.findAll({where:{id:userId}, include: Tought, order: [['createdAt', 'DESC']], raw:true, nest: true})

        const user = tought[0]
        
        res.render('user/userProfile', {user, tought})
    }

    static async editProfile(req, res) {
        const id = req.params.id

        const user = await User.findOne({where:{id:id}, raw:true})

        console.log(user)

        res.render('user/editProfile', {user})

    }

    static async saveEditProfile(req, res) {

        const {name, bio, location, link, pic_profile, pic_cover} = req.body

        const user = {
            name: name,
            bio_profile: bio,
            location_profile: location,
            link_profile:link,
            pic_profile:pic_profile,
            pic_cover:pic_cover
        }

        const id = req.params.id

        await User.update(user, {where:{id:id}})

        req.session.save(() => {
            res.redirect('/user/profile')
        })

    }
}