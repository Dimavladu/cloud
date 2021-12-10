const jwt = require('jsonwebtoken')
const config = require('../key.json')

module.exports = (req, res, next) =>{
    if(req.methods === 'OPTIONS'){
        return next
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'Ошибка авторизации'})
        }
        const decoded = jwt.verify(token, config.secret)
        if(!decoded.id){
            return res.status(401).json({message: 'Ошибка авторизации'})
        }
        req.user = decoded
        next()
    }catch (e) {
        return res.status(401).json({message: 'Ошибка авторизации'})
    }
}