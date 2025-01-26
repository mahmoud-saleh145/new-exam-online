'use client'
import { useState } from "react";
import { FcAlarmClock } from "react-icons/fc";

interface ExamQuestionsProps {
    question: Questions[];
}

export default function ExamQuestions({ question }: ExamQuestionsProps) {

    const [active, setActive] = useState(0)
    const [selected, setSelected] = useState<Selected[]>([])
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<Questions[]>([])
    const [inCorrectAnswer, setInCorrectAnswer] = useState<Questions[]>([])


    function next() {
        // check if the question already answered & user select a answer
        if (!(answers.some((a) => a.index === selected[0]?.index)) && selected.length != 0) {
            setAnswers((prev) => [...prev, ...selected.map(s => ({ ...s.answer, index: s.index }))])
            setSelected([])
        }
        // check if the user return to change any answer 
        else if (answers.some((a) => a.index === selected[0]?.index) && selected.length != 0) {
            answers.forEach((a) => {
                if (a.index === selected[0]?.index) {
                    a.answer = selected[0]?.answer.answer
                    a.key = selected[0]?.answer.key
                }
            })
            setSelected([])
        }
        // get the next question
        if (active < question.length + 1 && selected) {
            setActive(active + 1)
        }
    }

    function handelAnswer(props: Selected) {
        setSelected([props]);
    }

    function back() {
        if (active > 0) {
            setActive(active - 1)
        }
    }

    function showResult() {
        answers.map((a, i) => {
            // check if the user's answers match the correct answer 
            if (a.key === question[i]?.correct) {
                setCorrectAnswer((prev) => [...prev, question[i]])
            } else if (a.key !== question[i]?.correct) {
                setInCorrectAnswer((prev) => [...prev, question[i]])
            }
        })
    }



    return (
        <>
            <div className="ExamQuestions-layout w-100 h-100 d-flex justify-content-center align-items-center position-absolute top-0 start-0 ">
                <div className="question-layout bg-white rounded-4 p-3">
                    {/* window number 1 (instructions) */}
                    {active === 0 ?
                        <div>
                            <p>instructions</p>
                            <ul>
                                <li>Lorem ipsum dolor sit amet consectetur</li>
                                <li>Lorem ipsum dolor sit amet consectetur</li>
                                <li>Lorem ipsum dolor sit amet consectetur</li>
                                <li>Lorem ipsum dolor sit amet consectetur</li>
                            </ul>
                            <button className="btn main-button w-100 rounded-4 text-white mt-2" onClick={() => setActive(active + 1)} >Start</button>
                        </div>
                        :
                        // if there questions 
                        question?.map((questions: Questions, index: number) => (
                            <div key={questions._id}>
                                {/*  window number 2 (questions) */}
                                {active === index + 1 ?
                                    <div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <small className="fw-semibold main-color">Question {active} of {question.length} </small>
                                            <span className="text-success mb-2"> <FcAlarmClock />14:59</span>
                                        </div>
                                        <p className="fs-6 mb-2 mt-4 fw-semibold">{questions.question}</p>
                                        <div>
                                            <div className="row flex-column gy-3 gy-3 mx-1 mb-4 ">
                                                {/* mapping for answers */}
                                                {Array.isArray(questions.answers) && questions.answers.map((answer: Answer, i: number) => (
                                                    <div className='answer-background p-3 rounded-3' key={answer.key}>
                                                        <input
                                                            className="form-check-input me-2"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id={`${answer.key}`}
                                                            value={answer.key}
                                                            onChange={() => handelAnswer({ index, answer })}

                                                            checked={answers[index]?.key === answer.key || undefined}
                                                        />
                                                        <label className="mb-0 fw-semibold" htmlFor={`${answer.key}`}>{answer.answer}</label>
                                                    </div>
                                                ))}

                                            </div>
                                            <div className="d-flex gap-5">
                                                <button className="btn main-color back-button w-100 rounded-4 mt-2 fw-semibold" type='submit' onClick={() => { back() }} >Back</button>
                                                <button className="btn main-button w-100 rounded-4 text-white mt-2 fw-semibold" disabled={selected.length === 0 && !(answers[index]?.index === index) || undefined} type='submit' onClick={() => { next() }}>Next</button>
                                            </div>

                                        </div>
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                        ))}

                    {/* window number 3 (result) */}
                    {active === question.length + 1 ?
                        <div className="container-flued">
                            <p className='fw-semibold'>Your score</p>
                            {correctAnswer ?
                                <div className="row align-items-center justify-content-around  py-2 ">
                                    <div className="col-sm-6 col-6">
                                        <div className=" percentage p-0 d-flex align-items-center justify-content-center ms-auto">
                                            <p className="mb-0 ">{((correctAnswer.length / question.length) * 100).toFixed()}%</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-6 d-flex align-items-center  gap-3 ">

                                        <div className="d-flex flex-column  ">
                                            <span className="mb-0 main-color fw-semibold pb-3 fs-6 ">Correct </span>
                                            <span className="mb-0 text-danger fw-semibold fs-6">Incorrect </span>
                                        </div>

                                        <div className="align-items-center d-flex flex-column justify-content-center  ">
                                            <div className="border border-2 rounded-circle in-correct-circle mb-2 ">
                                                <span className=" mb-0  main-color fw-semibold  "> {correctAnswer.length}</span>
                                            </div>

                                            <div className="border border-2 rounded-circle in-correct-circle  ">
                                                <span className=" mb-0 text-danger fw-semibold"> {inCorrectAnswer.length}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-3 mt-4">
                                        <button className="btn main-color back-button w-100 rounded-4  fw-semibold" onClick={() => { window.location.reload() }} >Back</button>
                                        <button className="btn main-button w-100 rounded-4 text-white  fw-semibold" onClick={showResult} >Show results</button>
                                    </div>
                                </div>
                                :
                                ''}
                        </div>
                        : ''}

                </div>
            </div>
        </>
    )
}


