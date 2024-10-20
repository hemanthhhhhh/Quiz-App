import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [quesion, setQuestion] = useState(data[index])
    let [lock, setLock] = useState(false)
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)

    let option1 = useRef(null)
    let option2 = useRef(null)
    let option3 = useRef(null)
    let option4 = useRef(null)

    let option_array = [option1, option2, option3, option4]

    const reset = () => {
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }

    const next = () => {
        if(lock === true) {
            if(index === data.length - 1) {
                setResult(true)
                return 0
            }
            setIndex(++index)
            setQuestion(data[index])
            setLock(false)
            option_array.map((option)=> {
                option.current.classList.remove("correct")
                option.current.classList.remove("wrong")
                return null
            })
        }
    }
    const checkAnswer = (e, ans) => {
        if(lock === false) {
            if(quesion.ans === ans) {
                e.target.classList.add("correct")
                setLock(true)
                setScore((prev) => prev + 1)
            }
            else {
                e.target.classList.add("wrong")
                setLock(true)
                option_array[quesion.ans - 1].current.classList.add("correct")
            }
        }
    }

  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr/>
        {result ? <></> : 
            <>
             <h2>{index + 1}. {quesion.question}</h2>
             <ul>
                 <li ref = {option1} onClick={(e) => {checkAnswer(e, 1)}}>{quesion.option1}</li>
                 <li ref = {option2} onClick={(e) => {checkAnswer(e, 2)}}>{quesion.option2}</li>
                 <li ref = {option3} onClick={(e) => {checkAnswer(e, 3)}}>{quesion.option3}</li>
                 <li ref = {option4} onClick={(e) => {checkAnswer(e, 4)}}>{quesion.option4}</li>
             </ul>
             <button onClick={next}>Next</button>
             <div className="index">
                 {index + 1} of {data.length} questions
             </div>
            </>
        }
        {result ? 
            <>
            <h2>You scored {score} out of {data.length}</h2>
            <button onClick={reset}>Reset</button>
            </> : <></>
        }
    </div>
  )
}

export default Quiz
