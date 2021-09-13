import type { CoursePart } from "../App"

const Part: React.FC<{part: CoursePart}> = ({part}) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        )
    }
    switch (part.name) {
        case "Fundamentals": {
            return <p>{part.name} {part.exerciseCount} {part.description}</p>
        }
        case ("Using props to pass data"): {
            return <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
        }
        case ("Deeper type usage"): {
            return <p>{part.name} {part.exerciseCount} {part.description} <a target='_blank' href={part.exerciseSubmissionLink}>exercise Submission</a></p>
        }
        case("React with types"): {
            return <p>{part.name} {part.exerciseCount} {part.description} <a target='_blank' href={part.gitHubRepo}>gitHub repo</a></p>
        }
        default: {
            return assertNever(part);
        }
    }
}

export default Part