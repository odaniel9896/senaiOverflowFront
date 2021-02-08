
import { TagComponent } from "./styles"

function Tag ({info, handleClose}) {
    return (
        <TagComponent>
            {info}
            <span onClick={handleClose}>&times;</span> 
        </TagComponent>
    )
}
export default Tag