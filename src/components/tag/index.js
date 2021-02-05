
import { TagComponent } from "./styles"

function Tag ({info}) {
    return (
        <TagComponent>
            {info}
            <span>&times;</span> 
        </TagComponent>
    )
}
export default Tag