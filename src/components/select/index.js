import { Container } from "./styles";
import { ForwardedRef, forwardRef } from "react";

const Select = forwardRef(({id, label, value, handler, children, ...rest}, ref) => {
    return (
        <Container>
            <label htmlFor={id}>Categorias</label>
                <select id={id} value={value} onChange={handler} {...rest} ref={ref}>
                    {children} 
                </select>
        </Container>
    )
})

export default Select;