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
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CiSearch } from 'react-icons/ci';


export default function SideMenu() {

    // logout from api and delete token from cookies  
    async function logout() {
        const res = await fetch('http://localhost:3000/api/logout')
        const data = await res.json()
        if (data.message == 'success') {
            signOut()
        }
    }

    return (
        <>

            <div className='row flex-column gy-3 d-none d-md-block'>
                <div  >
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


            <Navbar expand="lg" className=" d-md-none d-block main-background fixed-top">
                <Container className='w-sm-100' >
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0' />
                    <span className=" border-0 px-3 pt-1 ms-auto"><CiSearch /></span>
                    <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav className="me-auto bg-white py-3 ps-2 ">
                            <button className='btn w-25 fw-semibold second-color logOutButton' onClick={logout} ><span className='main-color me-3 logoutIcon'><RiLogoutBoxFill /></span> Log Out</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>


    );





}
