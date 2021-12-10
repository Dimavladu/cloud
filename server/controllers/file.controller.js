const fileService = require('../services/file.service')
const key = require('../key.json')
const fs = require('fs')
const db = require('../db')

class FileController{
    async createDir(req, res){
        try {
            const {name, type} = req.body
            let parent = req.body.parent
            if (!parent){
                const userDir = await db.query(
                    `SELECT * FROM file WHERE type IS NULL and "user" = ${req.user.id} and path = ''`)
                parent = userDir.rows[0].id
            }
            const file = await db.query(
                `INSERT INTO file (name, type, parent, "user") values ($1, $2, $3, $4) RETURNING *`,
                [name, type, parent , req.user.id]
            )
            const newFile = file.rows[0]
            const parentFile = await db.query(`SELECT * from file WHERE id = ${parent}`)
            if (!parentFile.rows[0]){
                newFile.path = name
                await db.query(`UPDATE file SET path = $1 WHERE id=$2`,
                    [newFile.path, newFile.id])
                await fileService.createDir(newFile)
            } else {
                newFile.path = `${parentFile.rows[0].path}/${newFile.name}`

                await db.query(`UPDATE file SET path = $1 WHERE id=$2`, [newFile.path, newFile.id])
                await db.query(`UPDATE file SET childs = childs || ${newFile.id} WHERE id=${parent}`)

                await fileService.createDir(newFile)
            }
            return res.json(newFile)
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка при создании папки'})
        }
    }
    async getFiles(req, res){
        try {
            let parent = req.query.parent
            if(parent){
                const files = await db.query(
                    `SELECT * FROM file WHERE "user" = $1 and parent = $2`, [req.user.id, parent])
                return res.json(files.rows)
            }
            const userDir = await db.query(
                `SELECT * FROM file WHERE type IS NULL and "user" = ${req.user.id} and path = ''`)
            parent = userDir.rows[0].id
            const files = await db.query(`SELECT * FROM file WHERE "user" = $1 and parent=$2`,
                [req.user.id, parent])
            return res.json(files.rows)
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка при поиске файла'})
        }
    }
    async uploadFile(req, res){
        try{
            const file = req.files.file

            const parentId = await db.query(`SELECT * FROM file WHERE "user" = $1 and id = $2`,
                [req.user.id, req.body.parent])
            const client = await db.query(`SELECT * from client WHERE id = $1`, [req.user.id])
            const user = client.rows[0]
            const parent = parentId.rows[0]
            file.size = Math.floor(file.size/1024)

            if(user.usedSpace + file.size > user.diskSpace){
                return res.status(400).json({message: 'Недостаточно свободного места'})
            }
            user.usedSpace = user.usedSpace + file.size

            let path
            if (parent) path = `${key.filePatch}/${user.id}/${parent.path}/${file.name}`
            else path = `${key.filePatch}/${user.id}/${file.name}`

            if(fs.existsSync(path)) {
                return res.status(400).json({message: 'Файл уже существует'})
            }
            file.mv(path)

            const type = file.name.split('.').pop()
            let dbFile
            if (parent){
                dbFile = await db.query(
                    `INSERT INTO file (name, type, size, path, parent, "user") 
                        values ($1, $2, $3, $4, $5, $6) RETURNING *`,
                    [file.name, type, file.size, parent.path, parent.id, req.user.id])
            }else{
                const userDir = await db.query(
                    `SELECT * FROM file WHERE type IS NULL and "user" = ${req.user.id} and path = ''`)
                dbFile = await db.query(
                    `INSERT INTO file (name, type, size, parent, "user") values ($1, $2, $3, $4, $5) RETURNING *`,
                    [file.name, type, file.size, userDir.rows[0].id, req.user.id])
            }

            await db.query(`UPDATE client SET "usedSpace" = $1 where id = $2`,
                [user.usedSpace, req.user.id])

            res.json(dbFile.rows[0])
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка при загрузке файла'})
        }
    }
    async deleteFile(req, res){
        try {
            const resFile = await db.query(`SELECT * FROM file WHERE "user" = $1 and id = $2`, [req.user.id, req.query.id])
            const file = resFile.rows[0]
            if (!file) return res.status(400).json({message: 'Файл не найден'})
            fileService.deleteFile(file)
            await db.query(`DELETE FROM file where "user" = $1 and id = $2`, [req.user.id, req.query.id])
            if (file.type !== 'dir'){
                const resSpace = await db.query(`SELECT "usedSpace" from client WHERE id = ${req.user.id}`)
                const usedSpace = resSpace.rows[0].usedSpace - file.size
                await db.query(`UPDATE client SET "usedSpace" = $1 WHERE id = $2`, [usedSpace, req.user.id])
            }
            const message = file.type === 'dir' ? `Папка ${file.name} успешно удалена` : `Файл ${file.name} успешно удален`
            return res.json({message})
        }catch (e) {
            console.dir(e)
            return res.status(400).json({message: 'Папка не может быть удалена, пока в ней находятся файлы или папки'})
        }
    }
    async downloadFile(req, res){
        try {
            const dbFile = await db.query(`SELECT * FROM file WHERE id = $1 and "user" = $2`,
                [req.query.id, req.user.id])
            const file = dbFile.rows[0]
            const path = `${key.filePatch}/${req.user.id}${file.path}/${file.name}`

            if (fs.existsSync(path)) return res.download(path, file.name)
            else return res.status(400).json({message: 'Файл не найден'})
        }catch (e) {
            console.log(e)
            res.status(500).json({message: 'Ошибка при скачивании файла'})
        }
    }
}

module.exports = new FileController()