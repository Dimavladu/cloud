const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const fileUpload = require('express-fileupload')

const authRoutes = require('./server/routes/auth.routes')
const fileRoutes = require('./server/routes/file.routes')

const corsMiddleware = require('./server/middleware/cors.middleware')

const app = express()
const PORT = process.env.PORT || 8080


app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/file', fileRoutes)

app.listen(PORT, () => console.log('Listening on port:' + PORT))

