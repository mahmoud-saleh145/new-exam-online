import img from "../../public/Frame 40.png";
import Image from "next/image"
import { CiSearch } from "react-icons/ci";
import SideMenu from "@/components/custom/sideMenu/SideMenu";
import QuizList from "@/components/custom/quizList/QuizList";


export default async function Home() {

  return (
    <>
      <div className="container-flued p-3 bg-home overflow-hidden  ">
        <div className="row ">
          <div className="col-md-2 p-4">
            <SideMenu />
          </div>
          <div className="col-md-10 p-4">
            <div className="row align-items-center gy-3 gx-3 mb-4 d-none d-md-block ">
              <div className="col-md-9">
                <div className="input-group align-items-center ">
                  <span className="search-icon main-color border-0 px-3 pt-1  " ><CiSearch /></span>
                  <input type="text" className="form-control search-shadow py-2  border-0" placeholder="Search Quiz" />
                </div>
              </div>
              <div className="col-md-2 col-0">
                <button className='btn text-white main-button py-2 w-100 fw-semibold rounded-4'>Start Quiz</button>
              </div>
              <div className="col-md-1  ">
                <Image src={img} alt="main image" priority width={45} height={0} className="rounded-circle" />
              </div>
            </div>

            {/* display subjects */}
            <QuizList />
          </div>
        </div>
      </div>
    </>
  );
}