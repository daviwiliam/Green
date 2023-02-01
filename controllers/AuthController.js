const User = require('../models/User')

const bcrypt = require('bcryptjs')
const { readdirSync } = require('fs')

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async loginSave(req, res) {
        const {email, password} = req.body

        const user = await User.findOne({where: {email: email}})

        if(!user){
            req.flash('message', 'Usuário não encontrado!')
            res.render('auth/login')
            return
        }

        const passwordCheck = bcrypt.compareSync(password, user.password)

        if(!passwordCheck){
            req.flash('message', 'Senha inválida!')
            res.render('auth/login')
            return
        }

        req.session.userid = user.id

        req.session.save(() => {
            res.redirect('/')
        })


    }

    static async registerSave(req, res) {
        const {name, email, password, confirmpassword} = req.body

        // password validation
        if(password != confirmpassword) {
            req.flash('message', 'As senhas não coincidem!')
            res.render('auth/register')

            return 
        }

        //check if user exists
        const checkUserExists = await User.findOne({where: {email: email}})
        if(checkUserExists){
            req.flash('message', 'E-mail já está em uso!')
            res.render('auth/register')

            return
        }

        //create password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try{
            const createdUser = await User.create(user, {raw:true})

            req.session.userid = createdUser.id

            req.session.save(() => {
                res.redirect('/')
            })

        }catch(err){
            console.log(err)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}