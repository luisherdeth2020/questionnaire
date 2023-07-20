import { useState } from 'react'
import './App.css'

const questionnaire = [
  {
    question: '¿Cuál es mi apellido?',
    options: ['Marqués', 'Mendoza', 'Perez'],
    answer: 'Mendoza',
    userAnswer: null,
  },
  {
    question: '¿Cuál es mi segundo nombre?',
    options: ['Herdeht', 'Herdet', 'Herdeth'],
    answer: 'Herdeth',
    userAnswer: null,
  },
  {
    question: ' ¿Color favorito?"',
    options: ['Negro', 'Azul', 'Amarillo'],
    answer: 'Amarillo',
    userAnswer: null,
  },
  {
    question: ' ¿Cómo me gusta la pizza?"',
    options: ['Atún y jamón', 'Piña y jamón', 'Atún y piña'],
    answer: 'Atún y piña',
    userAnswer: null,
  },
  {
    question: ' ¿Qué jugador de la WPT soy fan?"',
    options: ['Paquito', 'Tello', 'Galán'],
    answer: 'Tello',
    userAnswer: null,
  }
];

function App() {

  const [questions, setQuestions] = useState(questionnaire)
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const onAnswer = (answer) => {

    const updatedQuestions = [...questions]
    updatedQuestions[currentQuestion].userAnswer = answer

    setQuestions(updatedQuestions)

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } 
  }
  const hasFinished = questions.filter((q)=>q.userAnswer !== null)?.length === questions?.length;
  const score = questions.filter(answer => answer.answer === answer.userAnswer).length

  const renderEndText = () => {
    if (score === questions.length) {
      return '🏆¡Enhorabuena, me conoces muy bien!🏆'
    }
    if(score > 2){
      return 'Me conoces más que el 50%😃'
    }
    if(score <=2){
      return 'Pensaba que me conocías..😥'
    }
  }

  return (
    <div className='container'>
      <h1>¿Cuánto sabes de mi?😏</h1>
      {hasFinished ? (
        <div className="showScore">
          <h3>Tu puntuación es {score} de {questions.length}</h3>
          <h4 className='isWin'>{renderEndText()}</h4>
          <h3>Tus respuestas:</h3>
          <p>{questions.map((questions, index) => (
            <p>{index + 1}.- {questions.userAnswer}</p>
          ))}</p>
        </div>)
        : (
          <>
            <div className='questions'>
              <h2>{currentQuestion + 1}.-
                {questions[currentQuestion].question}
              </h2>
            </div>
            <div className="answers">
              {questions[currentQuestion].options.map((option) => (
                <button onClick={() => onAnswer(option)}>{option}</button>
              ))}
            </div>
          </>
        )
      }
    </div>
  );
};

export default App;
