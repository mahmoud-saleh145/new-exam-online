import QuizCard from "../quizCard/QuizCard";
import MemberInformation from "../memberInformation/MemberInformation";

export default async function QuizList() {

    return (
        <>
            <section>
                <MemberInformation />
                <div className=" bg-white p-3 rounded-4 quizes-shadow">
                    <h6 className="main-color fs-4 fw-semibold mb-4">Quizes</h6>
                    <QuizCard />
                </div>
            </section>
        </>
    )
}