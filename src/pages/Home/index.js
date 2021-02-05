import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionsContainer,
  QuestionCard,
  Logo,
  IconSignOut,
  FormNewQuestion,
} from "./styles";

import { format } from "date-fns";

import Input from "../../components/input";

import imgProfile from "../../assets/foto_perfil.png";
import logo from "../../assets/logo.png";
import { api } from "../../services/api";
import { getUser, signOut } from "../../services/security";
import Modal from "../../components/modal";
import Select from "../../components/select";
import Tag from "../../components/tag";

function Profile() {

  const student = getUser();

  return (
    <>
      <section>
        <img src={imgProfile} alt="Imagem de Perfil" />
        <a href="#">Editar Foto</a>
      </section>
      <section>
        <strong>NOME:</strong>
        <p>{student.name}</p>
      </section>
      <section>
        <strong>RA:</strong>
        <p>{student.ra}</p>
      </section>
      <section>
        <strong>E-MAIL:</strong>
        <p>{student.email}</p>
      </section>
    </>
  );
}

function Answer({ answer }) {

  const student = getUser();

  return (
    <section>
      <header>
        <img src={imgProfile} />
        <strong>Por{" "}
          {student.studentId === answer.Student.id ? "Você" : answer.Student.name}</strong>
        <p> {format(new Date(answer.created_at), "dd/MM/yyyy 'AS' HH:mm")}</p>
      </header>
      <p>{answer.description}</p>
    </section>
  );
}

function Question({ question }) {
  const [showAnswers, setShowAnswers] = useState(false);

  const [newAnswer, setNewAnswer] = useState("");

  const [answers, setAnswers] = useState(question.Answers);

  const qtdAnswers = answers.length;

  const student = getUser();

  const handleAddAnswer = async (e) => {
    e.preventDefault();

    if (newAnswer.length < 10)
      return alert("A resposta deve ter no mínimo 10 caracteres");

    try {
      const response = await api.post(`/questions/${question.id}/answer`, {
        description: newAnswer,
      });

      const aluno = getUser();

      const answerAdded = {
        id: response.data.id,
        description: newAnswer,
        created_at: response.data.createdAt,
        Student: {
          id: aluno.studentId,
          name: aluno.name,
        },
      };

      setAnswers([...answers, answerAdded]);

      setNewAnswer("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <QuestionCard>
      <header>
        <img src={imgProfile} ALT="imagem do perfil"/>
        <strong>Por{" "}
          {student.studentId === question.Student.id ? "Você" : question.Student.name}</strong>
        <p>em {format(new Date(question.created_at), "dd/MM/yyyy 'AS' HH:mm")}</p>
      </header>
      <section>
        <strong>{question.title}</strong>
        <p>{question.description}</p>
        <img src={question.image} />
      </section>
      <footer>
        <h1 onClick={() => setShowAnswers(!showAnswers)}>
          {qtdAnswers === 0 ? (
            "Seja o primeiro a responder"
          ) : (
            <>
              {qtdAnswers}
              {qtdAnswers > 1 ? " Respostas" : " Resposta"}
            </>
          )}
        </h1>
        {showAnswers && (
          <>
            {answers.map((answer) => (
              <Answer answer={answer} />
            ))}
          </>
        )}
        <form onSubmit={handleAddAnswer}>
          <textarea
            minLength={10}
            placeholder="Responda essa dúvida!"
            onChange={(e) => setNewAnswer(e.target.value)}
            required
            value={newAnswer}
          ></textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCard>
  );
}

function NewQuestion () {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
   

    const loadCategories = async () => {
      try {
        const response = await api.get("/categories");

        setCategories(response.data)
      } catch (error) {
        alert(error)
      }
    };
    
    loadCategories();
  }, []);

  return (
    <FormNewQuestion>
        <Input id="title" label="Titulo"/>
        <Input id="description" label="description"/>
        <Input id="gist" label="gist"/>
        <Select id="categories" label="Categorias">
          <option value="">Selecione</option>
          {categories.map((c) => (
            <option value={c.id}>{c.description}</option>
          ))}
        </Select>
        <div>
          <Tag info="Backend"></Tag>
          <Tag info="Banco de Dados"></Tag>
        </div>
        <input type="file"/>
        <button>Enviar</button>
    </FormNewQuestion>
  )
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState( )

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await api.get("/feed");

      setQuestions(response.data);
    };

    loadQuestions();
  }, [reload]);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  const handleReload = () => {
    setReload(Math.random())
  } 

  return (
    <> 
       <Modal title="Faça uma pergunta">
         <NewQuestion>

         </NewQuestion>
       </Modal>
      <Container>
      <Header>
        <Logo src={logo} onclick={handleReload}/>
        <IconSignOut onClick={handleSignOut} />
      </Header>
      <Content>
        <ProfileContainer>
          <Profile />
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
    </>
  );
}

export default Home;
