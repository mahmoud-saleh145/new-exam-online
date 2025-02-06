'use client'
import LoadingPage from "@/components/common/LoadingPage";
import { useEffect, useState } from "react";
import ExamQuestions from "../ExamQuestions/ExamQuestions";

export default function ExamList({ searchParams }: { searchParams: { id: string; } }) {
    const id = searchParams.id

    const [loading, isLoading] = useState(false)
    const [exam, setExam] = useState<Exams[]>([])
    const [question, setQuestion] = useState<Questions[]>([])

    useEffect(() => {

        // fetch exams on subject
        async function getData() {
            isLoading(true)
            const res = await fetch(`http://localhost:3000/api/exams?id=${id}`)

            const data: APIResponse<PaginatedResponse<Exams[]>> = await res.json()

            if (!('code' in data)) {
                setExam(data?.exams)
                isLoading(false)
            }
            if (!res.ok) {
                isLoading(false)
                throw new Error('Failed to fetch data')
            }
        }
        getData()
    }, [id])

    // fetch question on the exam
    async function getExamQuestions(id: string) {
        isLoading(true)
        const res = await fetch(`http://localhost:3000/api/questions?id=${id}`)

        const data: APIResponse<QuestionResponse<Questions[]>> = await res.json()

        if (!('code' in data)) {
            setQuestion(data?.questions)
            isLoading(false)
        }

        if (!res.ok) {
            isLoading(false)
            throw new Error('Failed to fetch data')
        }
        isLoading(false)
    }

    return (
        <>


            {loading ? <LoadingPage /> :
                exam?.map((exam: Exams) => (
                    <div key={exam._id}>
                        <p className=" fs-6 fw-semibold">{exam.title}</p>
                        <div className="row">
                            <div className="col-lg-12 me-5 bg-white p-4 rounded-4 quizes-shadow d-flex justify-content-between mb-3">
                                <div>
                                    <div >
                                        <h5 className="">{exam.title.split(' ').slice(0, 1).join(' ')}</h5>
                                        <p className="question-font ">{exam.numberOfQuestions} Questions</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className="mb-1">{exam.duration} Minutes</p>
                                        <button className='btn text-white main-button py-0 px-4 rounded-4' onClick={() => { getExamQuestions(exam._id) }}>Start</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            {/* if fetch return question or no */}
            {question?.length > 0 ? <ExamQuestions question={question} /> : ''}
        </>
    )
}
