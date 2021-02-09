import { Container, FormLogin, Body, Header, Button } from "./style";
import Input from "../../components/input";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";
import { signIn } from "../../services/security";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

function Login() {
  const history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [showLogin, setShowLogin] = useState(false);

  const [message, setMessage] = useState(undefined)

  const handleSubmit = async (e) => {
    e.preventDefault();
    {showLogin &&  (
        <Loading/>
    )} 
    try {
      const response = await api.post("/sessions", login);

      signIn(response.data);

      console.log(response.data);

      //Implementar a autorização

      history.push("/home");
    } catch (error) {
      console.error(error);
      setMessage({title: "Ops...",  description: error.response.data.error})
    }
  };

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  return (
    <>
    <Alert message={message} type="error" handleClose={setMessage}/>
      <Container>
        <FormLogin onSubmit={handleSubmit}>
          <Header>
            <h1>Bem vindo ao Senai Overflow</h1>
            <h2>Para sua pergunta nós temos a resposta</h2>
          </Header>
          <Body>
            <Input
              id="email"
              label="E-mail"
              type="email"
              value={login.email}
              handler={handleInput}
              required
            />
            <Input
              id="password"
              label="Senha"
              type="password"
              value={login.password}
              handler={handleInput}
              required
            />
            <Button onClick={() => setShowLogin(true)}>Entrar</Button>
            <Link to="/register">Ou clique aqui para se cadastrar</Link>
          </Body>
        </FormLogin>
      </Container>
    </>
  );
}

export default Login;