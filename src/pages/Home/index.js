import { Container, Header, Content, ProfileContainer, FeedContainer, ActionContainer, QuestionCard } from "./styles";

import imgProfile from "../../assets/foto_perfil.png";



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