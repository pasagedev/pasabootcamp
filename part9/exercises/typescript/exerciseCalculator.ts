interface calcExcValues {
    exercisesHours: Array<number>;
    target: number;
}

const parseArguments = (args: Array<String>):calcExcValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    try {
        const argsNumbers = args
            .filter((v, index) => index > 1)
            .map(arg => Number(arg))
        if (argsNumbers.some(arg => isNaN(arg))) throw new Error("Provided values were not numbers");
        return {
            exercisesHours: argsNumbers.splice(1),
            target: argsNumbers[0]
        }
    } catch (error) {
        throw error;
    }
}


interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number }

const calculateExercises = (exercisesHours: Array<number>, target: number): Result => {
    const periodLength = exercisesHours.length;
    const trainingDays = exercisesHours.filter(hoursDay => hoursDay > 0).length;
    const totalExercisesHours = exercisesHours.reduce((total, hoursDay)=> {
        return total + hoursDay
    }, 0)
    const average = totalExercisesHours / periodLength
    let rating = 1, ratingDescription;
    switch (true) {
        case (average >= target): {
            rating = 3;
            ratingDescription = "You did an excellent job :)";
            break;
        }
        case (average > 7/10*target): {
            rating = 2;
            ratingDescription = "not too bad but could be better :/";
            break;
        }
        default: {
            rating = 1;
            ratingDescription = "you need to do it better :(";
            break;
        }

    }
    return {
        periodLength,
        trainingDays,
        success: average<target ? false : true,
        rating: rating,
        ratingDescription,
        target,
        average
    }
}
try {
    const {exercisesHours, target} = parseArguments(process.argv);
    console.log(calculateExercises(exercisesHours, target));
} catch (error) {
    console.log('Something was wrong: ', error.message)
}