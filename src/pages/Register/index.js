import { Container, FormLogin, Body, Header, Button } from "./style";
import Input from "../../components/input";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";
import Login from "../Login";
import Loading from "../../components/Loading";

function Register() {
  const history = useHistory();

  const [showRegister, setShowRegister] = useState(false);

  const [register, setRegister] = useState({
    ra: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validPassword = () => register.password === register.confirmPassword;

  const buttonDisabled = () => {
    const { ra, name, email, password } = register;

    if (!ra || !name || !email || !password || !validPassword()) return true;

    return false;
  };
  {showRegister &&  (
    <Loading/>
)}
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setShowRegister(true);

    try {
      const { ra, name, email, password } = register;

      const response = await api.post("/students", {
        ra,
        name,
        email,
        password,
      });

      console.log(response.data);

      setShowRegister(false)

      history.push("/home");

      //Implementar a autorização
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
      setShowRegister(false)
    }
  };

  const handleInput = (e) => {
    setRegister({ ...register, [e.target.id]: e.target.value });
  };

  return (
    <>
        {showRegister && (
      <Loading/>
    )}
    <Container>
      <FormLogin onSubmit={handleSubmit}>
        <Header>
          <h1>Bem vindo ao Senai Overflow</h1>
          <h2>Para sua pergunta nós temos a resposta</h2>
        </Header>
        <Body>
          <Input
            id="ra"
            label="RA"
            type="text"
            value={register.ra}
            handler={handleInput}
          />
          <Input
            id="name"
            label="Nome"
            type="text"
            value={register.name}
            handler={handleInput}
          />
          <Input
            id="email"
            label="E-mail"
            type="email"
            value={register.email}
            handler={handleInput}
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            value={register.password}
            handler={handleInput}
          />
          <Input
            id="confirmPassword"
            label="Confirmar Senha"
            type="password"
            onBlur={(e) => {
              if (!validPassword()) alert("As senhas não coincidem");
              e.target.focus();
            }}
            value={register.confirmPassword}
            handler={handleInput}
          />
          <Button disabled={buttonDisabled()} onClick={setShowRegister}>Entrar</Button>
          <Link to="/">Ou se ja tem cadastro clique aqui para entrar</Link>
        </Body>
      </FormLogin>
    </Container>
    </>
  );
}

export default Register;