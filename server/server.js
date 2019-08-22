const path = require ('path');
const fs = require ('fs');
const express = require ('express');

const app = express();

// app.use((req, res, next) => {
//     console.log(req.originalUrl);
//     next();
// });

const footballPath = path.join(__dirname, '/data/football.json')
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))

app.post('/register', (req, res) => {

    fs.readFile(footballPath, (err, data) => {
        if (err) console.log(err)
        const participants = JSON.parse(data)
        participants.push({
            name: req.body.name,
            position: req.body.position,
        })
        fs.writeFile(footballPath, JSON.stringify(participants), (err) => {
            if (err) console.log(err)
        })
    })
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Server running!')
})






// const quarterbackPath = path.join(__dirname, '/data/nflqbs.json')

// // This serves the home page by grabbing our html out of the public folder. '/' is optional, without it default is set to '/'.
// // app.use(path, callback)
// app.use('/', express.static('public'))

// app.get('/quarterbacks', (req, res) => {
//     fs.readFile(quarterbackPath, (err, data) => {
//         if(err) console.log(err)
//         const quarterbacks = JSON.parse(data);
//         res.send(quarterbacks);
//     })
// })