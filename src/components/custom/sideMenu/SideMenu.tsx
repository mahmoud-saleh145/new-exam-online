'use client'
import img from '../../../../public/Final Logo 1.png';
import Image from "next/image"
import { MdSpaceDashboard } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CiSearch } from 'react-icons/ci';
import userImg from "../../../../public/Frame 40.png";
import { useState } from 'react';
import LoadingPage from '@/components/common/LoadingPage';

export default function SideMenu() {

    const [loading, setLoading] = useState(false)

    // logout from api and delete token from cookies  
    async function logout() {
    
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`)
        const data = await res.json()
        if (data.message == 'success') {
            signOut()
            setLoading(false)
        }

    }

    return (
        <>
            {loading ? <LoadingPage /> :

                <div >

                    <div className='row flex-column gy-3 d-none d-lg-block '>
                        <div >
                            <Image src={img} alt="main image" />
                        </div>
                        <div >
                            <Link href={'/'} className='btn text-white main-button py-1 fw-semibold '> <span className=' me-3'><MdSpaceDashboard /></span> DashBoard</Link>
                            <button className='btn  my-3 fw-semibold second-color ' ><span className='main-color me-3'><FaHistory /></span> Quiz History</button>
                        </div>
                        <div >
                            <button className='btn fw-semibold second-color logOutButton' onClick={logout} ><span className='main-color me-3 logoutIcon'><RiLogoutBoxFill /></span> Log Out</button>
                        </div>
                    </div>


                    <Navbar expand="lg" className=" d-lg-none d-block main-background fixed-top w-sm-100 ">
                        <Container className='px-0 '>
                            <div className="">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0' />
                                <span className=" fs-4 border-0 px-3 pt-1 ms-auto"><CiSearch /></span>
                            </div>
                            <div className='pe-3'>
                                <Image src={userImg} alt="main image" priority width={40} height={0} className="rounded-circle" />
                            </div>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto bg-white py-3 ps-2  ">
                                    <div className='mb-4'>
                                        <Image src={img} alt="main image" width={90} />
                                    </div>
                                    <Link href={'/'} className='btn text-white main-button py-1 fw-semibold  fit-content'> <span className=' me-2'><MdSpaceDashboard /></span> DashBoard</Link>
                                    <button className='btn  my-3 fw-semibold second-color fit-content ' ><span className='main-color me-2'><FaHistory /></span> Quiz History</button>
                                    <button className='btn fw-semibold second-color logOutButton fit-content ' onClick={logout} ><span className='main-color me-2 logoutIcon'><RiLogoutBoxFill /></span> Log Out</button>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                </div>
            }
        </>
    );





}
