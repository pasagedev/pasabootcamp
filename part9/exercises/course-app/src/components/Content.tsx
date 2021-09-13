import {CourseParts} from '../types'

interface ContentProps {
    parts: CourseParts[]
}

const Content: React.FC<ContentProps> = ({parts}) => {
    return (
        <div>
            {parts.map(p => 
            <p id={p.name}>
                {p.name} {p.exerciseCount}
            </p>
            )}
        </div>
    )
}

export default Content