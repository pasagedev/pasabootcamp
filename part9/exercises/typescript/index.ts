import express from 'express';
import { calculateBmi, parseArguments } from './bmiCalculator';
import { checkArguments, calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const {height, weight} = parseArguments([
            "", "", req.query.height as string, req.query.weight as string
        ]);
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
});

app.post('/exerciseCalculator', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400).json({
            error: "parameters missing"
          });
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const validArguments = checkArguments(["","",target,...daily_exercises]);
        const result = calculateExercises(validArguments.exercisesHours, validArguments.target);
        res.json(result);
    } catch (error) {
        res.status(400).json({
            error: "malformatted parameters"
          });
    }
});

const PORT = 3003;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});
