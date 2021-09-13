import type {CoursePart} from '../App'
import Part from './Part'

interface ContentProps {
    parts: CoursePart[]
}

const Content: React.FC<ContentProps> = ({parts}) => {
    return (
        <div>
            {parts.map(p => <Part part={p}/> )}
        </div>
    )
}

export default Content