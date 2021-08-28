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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))