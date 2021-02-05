import { Container } from "./styles";


function Select ( {id, label, value, handler, children, ...rest}) {
    return (
        <Container>
            <label htmlFor={id}>Categorias</label>
                <select id={id} value={value} onChange={handler} {...rest}>
                    {children} 
                </select>
        </Container>
    )
}

export default Select;