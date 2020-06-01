import express, { response } from 'express';

const app = express();

app.get('/users', (req, res) => {
    console.log('get mara')
    res.json([
        'Dani',
        'Jorge',
        'Diego',
        'fran s'
    ]);
})

app.listen(3333);