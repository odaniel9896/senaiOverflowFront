import { Container, Header, Content, ProfileContainer, FeedContainer, ActionContainer, QuestionCard, Logo, ItemSingout } from "./styles";

import imgProfile from "../../assets/foto_perfil.png";

import logo from "../../assets/logo.png";





function Profile () {
    return (
        <>
        <section>
            <img src={imgProfile}/>
            <a href="#">Editar foto</a> 
        </section>
        <section>
            <strong>NOME</strong>
            <p>Fulano de tal</p>
        </section>
        <section>
            <strong>RA</strong>
            <p>1334567</p>
        </section>
        <section>
            <strong>EMAIL</strong>
            <p>
                fulanodetal@gmail.com
            </p>
        </section>
        </>
    );
}

function Home () {
    return (
        <Container>
            <Header>
                <Logo src={logo}/>
                <ItemSingout/>
            </Header>
            <Content>
                <ProfileContainer>
                    <Profile/>
                </ProfileContainer>
                <FeedContainer>
                    <QuestionCard>
                        <header>
                            <img src = {imgProfile}/>
                            <strong>Por Pedrinho</strong>
                            <p>Em 12/12/2012 as 12:12</p>
                        </header>
                        <section>
                            <strong>Titulo</strong>
                            <p>Descrição</p>
                            <img src={imgProfile}/>
                        </section>
                        <footer>
                            <h1>11 respostas</h1>
                            <section>
                                <header>
                                <img src={imgProfile}/>
                                <strong>Por Fulano</strong>
                                <p>12/12/2012 as 12:12</p>
                                </header>
                                <p>resposta para a pergunta</p>
                            </section>
                            <form>
                                <textarea
                                placeholder="Responda essa duvida!" required>
                                </textarea>
                                <button>Enviar</button>
                            </form>
                        </footer>
                    </QuestionCard>
                    <QuestionCard>
                        <header>
                            <img src = {imgProfile}/>
                            <strong>Por Pedrinho</strong>
                            <p>Em 12/12/2012 as 12:12</p>
                        </header>
                        <section>
                            <strong>Titulo</strong>
                            <p>Descrição</p>
                            <img src={imgProfile}/>
                        </section>
                        <footer>
                            <h1>11 respostas</h1>
                            <section>
                                <header>
                                <img src={imgProfile}/>
                                <strong>Por Fulano</strong>
                                <p>12/12/2012 as 12:12</p>
                                </header>
                                <p>resposta para a pergunta</p>
                            </section>
                            <form>
                                <textarea
                                placeholder="Responda essa duvida!" required>
                                </textarea>
                                <button>Enviar</button>
                            </form>
                        </footer>
                    </QuestionCard>
                </FeedContainer>
                <ActionContainer>
                    <button>
                        Fazer uma pergunta
                    </button>
                </ActionContainer>
            </Content>
        </Container>
    )
}

export default Home;