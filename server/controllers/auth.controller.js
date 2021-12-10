const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../key.json')
const fileService = require('../services/file.service')
const mailer = require('../nodemailer')

const generateAccessToken = (id) => {
    const payload = {id}
    return jwt.sign(payload, config.secret, {expiresIn: "12h"})
}

class authController{
    async registration(req, res){
        try {
            const {name, surname, email, password} = req.body
            const candidate = await db.query(`SELECT email from client where email = $1`, [email])
            if (candidate.rows[0]){
                return res.status(400).json({message: 'Пользователь с таким email уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 5)
            const registerUser = await db.query(
                `INSERT INTO client (name, surname, email, password, "diskSpace")
                values ($1, $2, $3, $4, $5) RETURNING * `,
                [name, surname, email, hashPassword, 20000]
            )
            console.log(registerUser.rows[0])
            const file = await db.query(
                `INSERT INTO file (name, "user") values($1, $2) RETURNING *`,
                [registerUser.rows[0].id, registerUser.rows[0].id])
            await fileService.createDir(file.rows[0])
            res.json({message: 'Пользователь успешно зарегистрирован'})

        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка регистрации'})
        }
    }
    async login(req, res){
        try{
            const {email, password} = req.body
            const user = await db.query(`SELECT * from client where email = $1`, [email])
            const u = user.rows[0]
            if (!u){
                return res.status(400).json({message: 'Пользователь с таким email не найден'})
            }
            const validPassword = bcrypt.compareSync(password, u.password)
            if (!validPassword){
                return res.status(400).json({message: 'Вы ввели неверный пароль'})
            }
            const token = generateAccessToken(u.id);
            return res.json({token,
            user:{
                name: u.name,
                surname: u.surname,
                email: u.email,
                diskSpace: u.diskSpace,
                usedSpace: u.usedSpace,
                avatar: u.avatar,
            }})
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка авторизации'})
        }
    }
    async auth(req, res){
        try{
            const user = await db.query(
                `SELECT * FROM client where id = ${req.user.id}`)
            const u = user.rows[0]
            const token = generateAccessToken(req.user.id);
            return res.json({token,
                user:{
                    name: u.name,
                    surname: u.surname,
                    email: u.email,
                    diskSpace: u.diskSpace,
                    usedSpace: u.usedSpace,
                    avatar: u.avatar,
                    restorePass: u.restorePass
                }})
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка авторизации'})
        }
    }
    async getUsers(req, res){
        try{
            const users = await db.query(`SELECT * FROM client`)
            res.json(users.rows)
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка авторизации'})
        }
    }
    async getUser(req, res){
        try{
            const id = req.params.id
            const user = await db.query(`SELECT name, surname, email FROM client where id = ${id}`)
            res.json(user.rows[0])
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка авторизации'})
        }
    }
    async updateUserInfo(req, res){
        try{
            const {name, surname, email, password} = req.body

            const pass = await db.query(`SELECT password FROM client where id = ${req.user.id}`)
            const realPassword = pass.rows[0].password

            const validPassword = bcrypt.compareSync(password, realPassword)
            if (!validPassword){
                return res.status(400).json({message: 'Пароль невереный'})
            }
            // const hashPassword = bcrypt.hashSync(password, 5)

            await db.query(`UPDATE client SET name = $1, surname = $2, email = $3 WHERE id = $4 RETURNING *`,
                    [name, surname, email, req.user.id])

            res.json({message: 'Информация успешно обновлена!'})
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка обновления информации'})
        }
    }
   async changePassword(req, res){
        try {
            const {password, newPassword} = req.body

            const pass = await db.query(`SELECT password FROM client where id = ${req.user.id}`)
            const realPassword = pass.rows[0].password

            const validPassword = bcrypt.compareSync(password, realPassword)
            if (!validPassword){
                return res.status(400).json({message: 'Пароль невереный'})
            }
            const hashPassword = bcrypt.hashSync(newPassword, 5)

            await db.query(`UPDATE client SET password = $1 WHERE id = $2 RETURNING *`,
                [hashPassword, req.user.id])
            res.json({message: 'Пароль успешно изменен!'})
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка при смене пароля'})
        }
   }
   async restorePass(req, res){
        try {
            const {email} = req.body
            const realEmail = await db.query(`SELECT * FROM client where email = $1`, [email])

            if (!!realEmail.rows[0]) {
                const password = Math.floor(Math.random()*10000000000)
                const message = {
                    to: email,
                    subject: 'Восстановление пароля BR-CLOUD',
                    text: `
                    Вы восстановили пароль на сайте BR-cloud
                    Ваш новый пароль ${password}`
                }
                const hashPassword = bcrypt.hashSync(password.toString(), 5)
                await db.query(`UPDATE client SET password = $1, "restorePass" = true where email = $2`, [hashPassword, email])
                mailer(message)
                res.json({message: 'Новый пароль успешно установлен и отправлен вам на почту'})
            }
            else res.status(400).json({message: 'Данной почты не существует в системе'})

        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка при восстановлении пароля'})
        }
   }
   async newPass(req, res){
        try {
            const {password} = req.body

            const hashPassword = bcrypt.hashSync(password.toString(), 5)

            await db.query(`UPDATE client SET password = $1, "restorePass" = false where id = $2`, [hashPassword, req.user.id])

            res.json({message: 'Новый пароль успешно установлен'})
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка при установке нового пароля'})
        }
   }
}

module.exports = new authController()