import { Container, FormLogin, Header, Body, Button } from "./style"
import Input from "../../components/input"

function Login () {
    return (
        <Container>
            <FormLogin>
                <Header>
                <h1>
                   BEM VINDO AO SENAI OVERFLOW
                </h1>
                <h2>
                    O SEU PORTAL DE RESPOSTAS
                </h2>
                </Header>
                <Body>
                <Input id="email" label="E-mail" type="email"/>
                <Input id="password" label="Senha" type="password"/>
                <Button>
                Entrar
                </Button>
                <a href="#">Ou Registre-se </a>
                </Body>  
            </FormLogin>
        </Container>
    )
}
export default Login