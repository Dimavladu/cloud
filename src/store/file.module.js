import axios from 'axios'

export default {
    namespaced: true,
    state(){
        return{
            files: [],
            resFiles: [],
            currentDir: null,
            fileMessage: {},
            fileProgress: [],
            showFileProgress: false
        }
    },
    mutations:{
        setFiles(state, files){
            state.files = files
        },
        addFile(state, file){
            state.files.push(file)
        },
        setDir(state, dir){
            state.currentDir = dir
        },
        deleteFile(state, fileId){
            state.files = state.files.filter(file => file.id !== fileId)
        },
        setFileMessage(state, message){
            state.fileMessage = message
        },
        clearFileMessage(state){
            state.fileMessage = {}
        },
        addFileProgress(state, file){
            state.fileProgress.push(file)
            state.showFileProgress = true
        },
        addFilePercent(state, [id, percent]){
            state.fileProgress.forEach(file => file.id === id ? file.percent = percent : '')
        },
        deleteFileProgress(state, id){
            state.fileProgress = state.files.filter(file => file.id !== id)
        },
        clearFileProgress(state) {
            state.fileProgress = []
        },
        changeShowFileProgress(state, param){
            state.showFileProgress = param
        },
        clearSearch(state){
            state.resFiles = []
        },
        setSearch(state, search){
           (!state.resFiles.length && search) ? state.resFiles = state.files : state.files = state.resFiles
           state.files = state.files.filter(file => file.name.toLowerCase().includes(search))
        },
    },
    actions:{
        setFileMessage({commit}, message){
            commit('setFileMessage', message)
            setTimeout(()=>{
                commit('clearFileMessage')
            }, message.timeout + 100)
        },
        async getFile({commit, dispatch, rootGetters}, dirId){
            try{
                const url = `http://localhost:8080/api/file${dirId ? '?parent='+dirId : ''}`
                const res = await axios.get(url, rootGetters['auth/authHeader'])
                res.data.forEach(file => file.dialog = false)
                commit('setFiles', res.data)
            }catch(e){
                dispatch('setFileMessage', {
                    text: e.response.data.message,
                    color: 'red darken-4',
                    timeout: 3000
                })
            }
        },
        async createDir({state, commit, dispatch, rootGetters}, dir){
            try {
                const url = 'http://localhost:8080/api/file'
                dir.parent = state.currentDir
                const file = await axios.post(url, dir , rootGetters['auth/authHeader'])
                file.data.dialog = false
                commit('addFile', file.data)
                dispatch('setFileMessage', {
                    text: `Папка ${file.data.name} успешно создана`,
                    color: 'primary',
                    timeout: 2000
                })
            }catch (e) {
                dispatch('setFileMessage', {
                    text: e.response.data.message,
                    color: 'red darken-4',
                    timeout: 3000
                })
            }
        },
        async uploadFile({state, commit, dispatch, rootState}, file){
            try {
                const formData = new FormData()
                formData.append('file', file)
                if (!!state.currentDir) formData.append('parent', state.currentDir)
                const url = 'http://localhost:8080/api/file/upload'
                commit('addFileProgress', {id: file.size, percent: 0, name: file.name})
                const res = await axios.post(url, formData,
                    {headers: {Authorization: `Bearer ${rootState.auth.token}`},
                    onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            commit('addFilePercent', [file.size, progress])
                        }
                    }
                })
                res.data.dialog = false
                commit('addFile', res.data)
                commit('auth/addSpace', res.data.size, {root:true})
                dispatch('auth/setBeer',true, {root:true})
                dispatch('setFileMessage', {
                    text: 'Файл успешно загружен',
                    color: 'primary',
                    timeout: 2000
                })
            }catch (e) {
                dispatch('setFileMessage', {
                    text: e.response.data.message,
                    color: 'red darken-4',
                    timeout: 3000
                })
            }
        },
        async deleteFile({commit, dispatch, rootGetters}, [id, file]){
            try{
                const url = `http://localhost:8080/api/file${id ? '?id='+id : ''}`
                const res = await axios.delete(url, rootGetters['auth/authHeader'])
                commit('deleteFile', id)
                if (file.type !== 'dir') commit('auth/deleteSpace', file.size, {root:true})
                dispatch('auth/setBeer',true, {root:true})
                dispatch('setFileMessage', {
                    text: res.data.message,
                    color: 'primary',
                    timeout: 2000
                })
            }catch(e){
                dispatch('setFileMessage', {
                    text: e.response.data.message,
                    color: 'red darken-4',
                    timeout: 3000
                })
            }
        },
        async downloadFile({dispatch, rootGetters}, file){
            try {
                const url = `http://localhost:8080/api/file/download?id=${file.id}`
                const response = await fetch(url, rootGetters['auth/authHeader'])

                const blob = await response.blob()
                const downloadUrl = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = downloadUrl
                link.download = file.name
                document.body.appendChild(link)
                link.click()
                link.remove()
                dispatch('setFileMessage', {
                    text: `Файл ${file.name} успешно загружен`,
                    color: 'primary',
                    timeout: 2000
                })
            }catch (e) {
                dispatch('setFileMessage', {
                    text: e.response.data.message,
                    color: 'red darken-4',
                    timeout: 3000
                })
            }
        }
    },
    getters: {
        fileMessage(state){
            return state.fileMessage.text ? state.fileMessage : null
        },
        isFileMessage(state){
            return state.fileMessage.text ? true : false
        },
        fileProgress(state){
            return state.fileProgress
        },
        showFileProgress(state){
            return state.showFileProgress
        }
        // dir(state){
        //     return state.currentDir
        // }

    }
}
