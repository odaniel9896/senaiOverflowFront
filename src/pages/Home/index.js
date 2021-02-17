import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import ReactEmbedGist from "react-embed-gist";
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
  GistIcon,
  ContainerGist,
  FormSearch
} from "./styles";

import { format } from "date-fns";
import SearchBar from "../../components/SearchIcon";

import Input from "../../components/input";

import imgProfile from "../../assets/foto_perfil.png";
import logo from "../../assets/logo.png";
import { api } from "../../services/api";
import { getUser, signOut, setUser } from "../../services/security";
import Modal from "../../components/modal";
import Select from "../../components/select";
import Tag from "../../components/tag";
import Loading from "../../components/Loading";
import { validSquaredImage } from "../../utils";
import { FaGithub } from "react-icons/fa";


function Profile({setisLoading, handleReload}) {

  const [student, setStudent] = useState({});

  useEffect(() => {
    setStudent(getUser())
  }, [])


  const handleImage = async (e) => {
    
    if(!e.target.files[0]) return;
    
    

    try {

      const data = new FormData();

      await validSquaredImage(e.target.files[0])

      data.append("image", e.target.files[0])

      setisLoading(true)

      const response = await api.post(`/students/${student.id}/images`, data);

      setTimeout(() => {
        setStudent({...student, image: response.data.image })
        handleReload()
      }, 1000);
      
      setUser({...student, image: response.data.image })

     
    } catch (error) {
      alert(error)
      setisLoading(false)
    }
  }

  return (
    <>
      <section>
        <img src={student.image || imgProfile} alt="Imagem de Perfil"/>
        <label htmlFor="editImageProfile">Editar Foto</label>
        <input id="editImageProfile" type="file" onChange={handleImage}/>
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
        <img src={answer.Student.image || imgProfile} />
        <strong>Por{" "}
          {student.studentId === answer.Student.id ? "Você" : answer.Student.name}</strong>
        <p> {format(new Date(answer.created_at), "dd/MM/yyyy 'AS' HH:mm")}</p>
      </header>
      <p>{answer.description}</p>
    </section>
  );
}

function Question({ question, setisLoading, setCurrentGist, setShowSearch, handleSearch }) {
  const [showAnswers, setShowAnswers] = useState(false);

  const [newAnswer, setNewAnswer] = useState("");

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers(question.Answers)
  }, [question.Answers])

  const qtdAnswers = answers.length;

  const student = getUser();

  const handleAddAnswer = async (e) => {
    e.preventDefault();
    
    setisLoading(true)
    
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
          image: aluno.image
        },
      };

      setisLoading(false)

      setAnswers([...answers, answerAdded]);

      setNewAnswer("");
    } catch (error) {
      alert(error);
      setisLoading(false)
    }
  };

  return (
    <>
        
      <QuestionCard>
        <header>
          <img src={question.Student.image || imgProfile} ALT="imagem do perfil"/>
    
          <strong>Por{" "}
            {student.studentId === question.Student.id ? "Você" : question.Student.name}</strong>
          <p>em {format(new Date(question.created_at), "dd/MM/yyyy 'AS' HH:mm")}
          </p>
          {question.gist  && <GistIcon onClick={() => setCurrentGist(question.gist)}/>}
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
    

  
       
    </>
  );
}

function NewQuestion ({handleReload, setisLoading}) {
  const [categories, setCategories] = useState([]);

  const [categoriesSel, setCategoriesSel] = useState([]);

  const [image, setImage] = useState(null)

  const imageRef = useRef()
  
  const categoriesRef = useRef()


  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    gist: "",
  })


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

  const handleCategories = (e) => {
    //console.log(e.target.value) Retorna o valor selecionado

    const idSel = e.target.value;
    //Verificando se a categorysel tem o mesmo id da idSel
    const categorySel = categories.find(c => c.id == idSel);

    if(categorySel && !categoriesSel.includes(categorySel))
      setCategoriesSel([...categoriesSel, categorySel])

    e.target[e.target.selectedIndex].disabled = true;
    e.target.value = "";
  }
  //RETIRA A IMAGEM DA POSIITON 0, PQ É A PRIMEIRA IMAGEM SELECIONADA
  const handleImage = (e)=> {
    if(e.target.files[0]) {
      imageRef.current.src = URL.createObjectURL(e.target.files[0])
      imageRef.current.style.display = "flex";
    }
    else {
      imageRef.current.src = "";
      imageRef.current.style.display = "none"
    }


    setImage(e.target.files[0])
  }
  const handleAddNewQuestion = async (e) => {
    e.preventDefault()

    const data = new FormData();

    data.append("title", newQuestion.title);
    data.append("description", newQuestion.description);
   

   const categories =  categoriesSel.reduce((s, c) => (s += c.id + ","), "");
    data.append("categories", categories.substr(0, categories.length -1));

    if(image) data.append("image", image)
    if(newQuestion.gist) data.append("gist", newQuestion.gist);

    setisLoading(true)
    try {
        await api.post("questions", data, {
          headers: {
            "Content-type": "multipart/form-data"
          },
        });
        handleReload();
    } catch (error) {
      alert(error)
      setisLoading(false)
    }
  }
  const handleUnselCategory= (idUnsel) => {
    setCategoriesSel(categoriesSel.filter(c => c.id  !== idUnsel))

    const {options} = categoriesRef.current;

    for( var i = 0; i < options.length; i++) {
      if(options[i].value === idUnsel.toString()) options[i].disabled = false
    }
  }
  const handleInput = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.id]: e.target.value });
  };

  return (
    <>

    <FormNewQuestion onSubmit={handleAddNewQuestion}>
        <Input id="title" label="Titulo" value={newQuestion.title} handler={handleInput}/>
        <Input id="description" label="description" value={newQuestion.description} handler={handleInput}/>
        <Input id="gist" label="gist" value={newQuestion.gist} handler={handleInput}/>
        <Select id="categories" label="Categorias" handler={handleCategories} ref={categoriesRef}>
          <option value="">Selecione</option>
          {categories.map((c) => (
            <option value={c.id} >{c.description}</option>
          ))}
        </Select>
        <div>
          {categoriesSel.map((c) => (<Tag key ={c.id} info={c.description} handleClose={() => handleUnselCategory(c.id)}></Tag>))}

        </div>
        <input type="file" onChange={handleImage}/>
        <img alt="imageVisualization" ref={imageRef}/>
        
              <button>Enviar</button>
  
    </FormNewQuestion>
    </>
  )
}
function Gist ({gist, handleClose}) {
  if(gist) {
    const formatedGist = gist.split(".com/").pop();
    return (
    <Modal title="Exemplo de codigo" handleClose={() => handleClose(undefined)}>
      <ContainerGist>
        <ReactEmbedGist gist={formatedGist}/>
      </ContainerGist>
      
    </Modal>

  )
  }
  
  else return null   
}


function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState(null)

  const [isLoading, setisLoading] = useState(false)

  const [searchFeed, setSearchFeed] = useState({
    search: "",
  })

  const [showSearch, setShowSearch] = useState(true)
  
  const [currentGist, setCurrentGist] = useState(undefined)

  const [showNewQuestion, setShowNewQuestion] = useState(false)

 


  useEffect((handleSearch) => {
    const loadQuestions = async () => {
      setisLoading(true)

      if(searchFeed.search === "") {
        const response = await api.get("/feed");
        setQuestions(response.data);  
        setisLoading(false) 
      }
      else {
        handleSearch()
      }
      
    };

    loadQuestions();
  }, [reload]);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  const handleReload = () => {
    setShowNewQuestion(false)
    setReload(Math.random())
  }

  const handleSearch = async (e) => {
    e.preventDefault()
      // setIsLoading(true);
      try {

        const response = await api.post("/search", searchFeed);

        console.log(response.data);
        
      } catch (error) {
        alert(error);
      }
  };
  const handleInputSearch = (e) => {
    setSearchFeed({ ...searchFeed, [e.target.id]: e.target.value})
  }

  

  return (
    <> 
    {isLoading && <Loading/>}
    {
        <Gist gist={currentGist} handleClose={setCurrentGist}/>  
    }
    
    {showNewQuestion && (
      //PASSANDO O SETISLOADING PARA O FILHO
      <Modal title="Faça uma pergunta" handleClose={() => setShowNewQuestion(false)}>
      <NewQuestion handleReload={handleReload} setisLoading={setisLoading}/>

      </Modal>
    )}
  
    
      <Container>
      <Header>
        <Logo src={logo} onclick={handleReload}/>
          <FormSearch onSubmit={handleSearch}>
            <SearchBar id="search" label="pesquisar" handler={handleInputSearch} required valur={searchFeed.search}/>
          </FormSearch>
        <IconSignOut onClick={handleSignOut} />
      </Header>
      <Content>
        <ProfileContainer>
          <Profile handleReload={handleReload} setisLoading={setisLoading}/>
        </ProfileContainer>
        
          <FeedContainer>
             {questions.map((q) => (
               <Question question={q} setisLoading={setisLoading} setCurrentGist={setCurrentGist}/>
             ))}
          </FeedContainer>
      

        <ActionsContainer>
        <button onClick={() => setShowNewQuestion(true)}>Fazer uma pergunta</button>
          
        </ActionsContainer>
      </Content>
    </Container>
    </>
  );
}

export default Home;
