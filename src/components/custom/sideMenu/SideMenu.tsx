'use client'
import img from '../../../../public/Final Logo 1.png';
import Image from "next/image"
import { MdSpaceDashboard } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import Link from 'next/link';
import { signOut } from 'next-auth/react';

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
        <div className='row flex-column gy-3 '>
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
    )

}
