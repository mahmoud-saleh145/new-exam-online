import { AiFillFlag } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import img from "../../../../public/Frame 40.png"
import Image from "next/image";
import { cookies } from 'next/headers';
import { decode } from "next-auth/jwt";
import { AUTH_COOKIE } from "@/lib/constants/auth.constant";



export default async function MemberInformation() {

    const tokenCookie = cookies().get(AUTH_COOKIE)?.value
    const token = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET! })

    async function getData() {
        const res = await fetch('https://exam.elevateegy.com/api/v1/auth/profileData', {
            method: 'GET',
            headers: {
                token: token?.token || ''
            }
        }
        )
        // if (!res.ok) {
        //     throw new Error('Failed to fetch data')
        // }
        const data = await res.json()
        return data
    }


    const info = await getData()


    return (
        <>
            <div className="container-flued bg-white px-3 py-3 rounded-4 quizes-shadow mb-5 mt-3">
                <div className="row align-items-center ">

                    {/* user image */}
                    <div className="col-md-2 me-4">
                        <Image src={img} alt="user img" sizes="100vw" style={{ width: '100%', height: 'auto', }} />
                    </div>

                    <div className="col-md-8">
                        <h5 className="main-color fw-bold fs-2">{info?.user.username}</h5>
                        <p className="second-color">Voluptatem aut</p>
                        <div className="progress " role="progressbar" aria-label="Basic example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                            <div className="progress-bar w-25"  ></div>
                        </div>
                        <div className="d-flex  mt-3 justify-content-between ">
                            <div className="user-details  d-flex">
                                <div className="fs-2 user-icons me-4"><AiFillFlag /></div>
                                <div className="">
                                    <p className="p-quiz mb-0 fs-3 fw-bold">22</p>
                                    <p>Quiz passed </p>
                                </div>
                            </div>
                            <div className="user-details  d-flex">
                                <div className=" fs-2 user-icons me-4"><FaClock /></div>
                                <div className="">
                                    <p className="p-quiz mb-0 fs-3 fw-bold">13 min</p>
                                    <p>fastest time</p>
                                </div>
                            </div>
                            <div className="user-details  d-flex">
                                <div className="fs-2 user-icons me-4"><FaCircleCheck /></div>
                                <div className=" ">
                                    <p className="p-quiz mb-0 fs-3 fw-bold">200</p>
                                    <p>correct answer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}