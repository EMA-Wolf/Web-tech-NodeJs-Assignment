const express = require('express')
const app = express()
const fs = require('fs')


const PORT = 5000

app.get('/', (req,res)=>{
    res.send('Welcome to the server')
})

app.get('/users', (req,res)=>{
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err){
            console.log(err)
            return res.status(404).send('Error loading users')
        }
        const users = JSON.parse(data)
        res.status(200).send(users)
    })
})

app.get('/users/:id', (req,res)=>{
    fs.readFile( __dirname + '/' + 'users.json', 'utf8', (err, data) => {
        if (err){
            console.log(err)
            return res.status(404).send('Error loading users')
        }
        const users = JSON.parse(data)
        const usersArray = Object.values(users)
        const user = usersArray.find(u => u.id === parseInt(req.params.id))
        console.log(user)
        if (!user) return res.status(404).send('User not found')
        res.status(200).send(user)
    })
})
app.get('/users/profession/:profession', (req,res)=>{
    fs.readFile( __dirname + '/' + 'users.json', 'utf8', (err, data) => {
        if (err){
            console.log(err)
            return res.status(404).send('Error loading users')
        }

        const users = JSON.parse(data)
        const usersArray = Object.values(users)
        const user = usersArray.find(u => u.profession === req.params.profession)
        if (!user) return res.status(404).send('User not found')
        res.status(200).send(user)
    })
})
app.get('/users/name/:name', (req,res)=>{
    fs.readFile( __dirname + '/' + 'users.json', 'utf8', (err, data) => {
             if (err){
            console.log(err)
            return res.status(404).send('Error loading users')
        }

        const users = JSON.parse(data)
        const usersArray = Object.values(users)
        const user = usersArray.find(u => u.name === req.params.name)
        if (!user) return res.status(404).send('User not found')
        res.status(200).send(user)
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})