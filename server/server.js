require('dotenv').config()
const express = require('express')
const massive = require('massive')
const ctrl = require('./controller')
const {SERVER_PORT, CONNECTION_STRING} = process.env


const app = express()

app.use(express.json())

app.post('/api/products', ctrl.createProduct)
app.get('/api/products', ctrl.getProducts)
app.get('/api/products/:id', ctrl.getProduct)
app.post('/api/products', ctrl.update)
app.delete('/api/products/:id', ctrl.delete)


massive(CONNECTION_STRING).then(databaseConnection => {
    app.set('db', databaseConnection)
    app.listen(SERVER_PORT, () => console.log(`listening to server ${SERVER_PORT}`))
}).catch(err => {
    console.log(err)
})
