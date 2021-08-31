import express from 'express';
import { calculateBmi, parseArguments } from './bmiCalculator';

const app = express();

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
    try {
        const {height, weight} = parseArguments([
            "", "", req.query.height as string, req.query.weight as string
        ])
        const bmi = calculateBmi(height, weight);
        res
            .status(200)
            .json({
                height,
                weight,
                bmi
            });
    } catch (e) {
        res
            .status(400)
            .json({error: "malformatted parameters"});
    }
    
})

const PORT = 3003;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})
