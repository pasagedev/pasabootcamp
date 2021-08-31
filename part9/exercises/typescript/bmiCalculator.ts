interface bmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<String>):bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    try {
        const height = Number(args[2]);
        const weight = Number(args[3]);
        
        if (isNaN(height) || isNaN(weight)) throw new Error("Provided values were not numbers")

        return {
            height: height < 10 ? height : height/100,
            weight
        }
    } catch (error) {
        throw error;
    }
}

const calculateBmi = (height:number, weight:number): string => {
    const bmi = (weight / (height)**2);
    switch(true) {
        case bmi < 18.5 : {
            return "Underweight";
        }
        case 18.5 <= bmi && bmi< 24.9 : {
            return "Normal (healthy weight)";
        }
        case bmi >= 24.9 && bmi < 29.9 : {
            return "Overweight";
        }
        case bmi >= 29.9 : {
            return "Obese";
        }
        default: {
            throw new Error("Some value it's not correct ")
        }
    }
}

try {
    const {height, weight} = parseArguments(process.argv)
    console.log(calculateBmi(height, weight));
} catch (error) {
    console.log('Something was wrong: ', error.message)
}

export {};