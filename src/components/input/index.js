const { Container } = require("./styles");

function Input({id, label, value, handler, ...rest}) {
    return (
        <Container>
            
            <input id={id} {...rest} placeholder = " " value={value} onChange={handler}></input>
            <label htmlFor={id}>{label}</label>
        </Container>
    )
}

export default Input