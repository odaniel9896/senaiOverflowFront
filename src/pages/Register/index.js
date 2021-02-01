import { Container, FormLogin, Header, Body, Button } from "./style"
import Input from "../../components/input"
import { Link } from "react-router-dom"

function Register () {
    return (
        <Container>
            <FormLogin>
                <Header>
                <h1>
                   BEM VINDO AO SENAI OVERFLOW
                </h1>
                <h2>
                   Informe os seus dados 
                </h2>
                </Header>
                <Body>
                <Input id="email" label="E-mail" type="email"/>
                <Input id="nome" label="Nome" type="text"/>
                <Input id="ra" label="Ra" type="text"/>
                <Input id="password" label="Senha" type="password"/>
                <Input id="valid-password" label="Revalide a senha" type="password"/>
                <Button>
                Registrar
                </Button>
                <Link to = "/">Volta para a Raiz</Link>
                </Body>  
            </FormLogin>
        </Container>
    )
}
export default Register