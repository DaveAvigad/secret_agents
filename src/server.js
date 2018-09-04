import express from 'express'
import morgan from 'morgan'
import path from 'path'
import Boom from 'boom'
import config from './config/env'
import router from './router'

const app = express()
const { SERVICE_PORT, NODE_ENV, IS_PRODUCTION } = config

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.set('Content-Type', 'application/json')
    next()
})
app.use([
    express.static(path.join(__dirname, 'public')),
    express.urlencoded({ extended: true }),
    express.json(),
])

app.set('json spaces', 4)
app.set('views', path.join(__dirname, 'views'))

app.use(morgan('dev'))
app.use(router)
app.use((err, req, res, next) => {
    console.log('ErrorHandler => ', err.message)
    if (Boom.isBoom(err)) return res.status(err.output.statusCode).json(err.output.payload)
    const _err = Boom.boomify(err)
    return res.status(_err.output.statusCode).json(_err.output.payload)
})


// Tests restart server fix
!module.parent &&
    app.listen(SERVICE_PORT)

console.log('NODE_ENV: ', NODE_ENV)
console.log('Listening on port ', SERVICE_PORT)

export default app
