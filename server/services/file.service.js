
const fs = require('fs')
const config = require('../key.json')

class FileService{
    async createDir(file){
        const filePath = this.getPath(file)
        console.log(filePath)
        return new Promise(((resolve, reject) =>{
            try {
                if (!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath)
                    return resolve({message: 'Файл был создан'})
                }else {
                    return reject({message: 'Файл уже существует'})
                }
            }catch (e) {
                console.log(e)
                return reject({message: 'Ошибка при создании файла'})
            }
        }))
    }
    deleteFile(file){
        if (file.type === 'dir') fs.rmdirSync(this.getPath(file))
        else fs.unlinkSync(this.getPath(file) + '/' + file.name)
    }
    getPath(file){
        return `${config.filePatch}/${file.user}/${file.path}`
    }
}

module.exports = new FileService()