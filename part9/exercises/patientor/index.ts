import express from 'express';
const app = express();

app.get('/', (_req, res) => {
    console.log('new request on this endpoint');

    res.send('pong');
});

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

