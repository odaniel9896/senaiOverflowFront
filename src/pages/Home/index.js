import {Container,Header,Content,ProfileContainer,FeedContainer,ActionsContainer,QuestionCard,Logo,IconSignOut,} from "./styles";
  
  import imgProfile from "../../assets/foto_perfil.png";
  import imgLogo from "../../assets/logo.png";
  import { useEffect, useState } from "react";
  import { api } from "../../services/api";
  import { signOut, getUser } from "../../services/security";
  import { Redirect, useHistory } from "react-router-dom";
  function Profile() {
    return (
      <>
        <section>
          <img src={imgProfile} alt="Imagem de perfil" />
          <a href="#">Editar Foto</a>
        </section>
        <section>
          <strong>NOME:</strong>
          <p>Fulano de tal</p>
        </section>
        <section>
          <strong>RA:</strong>
          <p>1234567</p>
        </section>
        <section>
          <strong>E-MAIL:</strong>
          <p>fulanodetal@gmail.com</p>
        </section>
      </>
    );
  }
  
  
  function Question({ question }) {
    const history = useHistory();
    
    const [addAnswer, setAddAnswer] = useState({
        description: ""
    });

    const [showAnswers, setShowAnswers] = useState(false) 

    const [answers, setAnswers] = useState(question.Answers)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/questions/${question.id}/answer`, addAnswer);

            const aluno = getUser()

            const answerAdd = {
                id: response.data.id,
                description: response.description,
                created_at: response.data.createdAt,
                Student : {
                    id: aluno.studentId,
                    name: aluno.name
                }
            }
            setAnswers([...answers, answerAdd]);

           
            console.log(response.data)
            history.push("/home")
        } catch (error) {
            console.error(error);
      alert(error.response.data.error);
        }

    }
    const handleInput = (e) => {
        setAddAnswer({ ...addAnswer, [e.target.id]: e.target.value });
    }


    

    return (
    

      <QuestionCard>
        <header>
          <img src={imgProfile} alt="imagem de perfil" />
          <strong>por {question.Student.name}</strong>
          <p>em {question.created_at}</p>
        </header>
        <section>
          <strong>{question.title}</strong>
          <p>{question.description}</p>
          <img src={question.image}></img>
        </section>
        <footer>
            <h1 onClick={() => setShowAnswers(!showAnswers)}>{answers.length}{" "} {answers.length > 1 ? "Respostas" : "Resposta"}
            </h1>
            {showAnswers && (
                <>
                     {answers.map((answers) => (
            <section>
              <header>
              <img src={imgProfile} alt="imagem de perfil" />
                  <strong>Por {answers.Student.name}</strong>            
                     <p>Em {answers.created_at}</p>
              </header>
                <p>{answers.description}</p>
          </section>
          ))}      
                </>
            )}
         
          <form onSubmit={handleSubmit}>
            <textarea placeholder="Responda essa dúvida!" id="description" label="answer" value={addAnswer.description} onChange={handleInput} required />
            <button>Enviar</button>
          </form>
        </footer>
      </QuestionCard>
    );
  }
  
  function Home() {
    const history = useHistory();
  
    const [questions, setQuestions] = useState([]);
  
    useEffect(() => {
      const loadQuestions = async () => {
        const response = await api.get("/feed");
  
        setQuestions(response.data);
      };
  
      loadQuestions();
    }, []);
  
    const handleSignOut = () => {
      signOut();
  
      history.replace("/");
    };
  
    return (
      <Container>
        <Header>
          <Logo src={imgLogo} />
          <IconSignOut onClick={handleSignOut} />
        </Header>
        <Content>
          <ProfileContainer>
            <Profile></Profile>
          </ProfileContainer>
          <FeedContainer>
            {questions.map((q) => (
              <Question question={q} />
            ))}
          </FeedContainer>
          <ActionsContainer>
            <button>Fazer uma pergunta</button>
          </ActionsContainer>
        </Content>
      </Container>
    );
  }
  
  export default Home;