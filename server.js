const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const port = 3000

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(express.static(path.join(__dirname, 'build')))

app.listen(port, () => {
    console.log(`CURG governance web server listening at http://localhost:${port}`)
})