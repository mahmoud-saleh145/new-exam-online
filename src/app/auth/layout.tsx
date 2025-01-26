import Image from "next/image";
import img from '../../../public/Frame 4.png'
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";


type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="container-flued">

            <main className="row align-items-center overflow-hidden gx-0 ">

                {/* main image in auth pages */}
                <section className="col-md-6 ">
                    <div className=" mainframe ">
                        <Image priority src={img} alt=" main image" />
                    </div>
                </section>

                <section className="col-md-6 col-sm-12 col-12 ">

                    <div className='d-flex gap-3 justify-content-end p-5 position-absolute end-0 top-0 m-3'>
                        <span><p>English<IoMdArrowDropdown /></p></span>
                        <span><Link href={'/auth/login'} className='main-color  fw-bolder link-underline link-underline-opacity-0'>Sign in</Link></span>
                        <span> <Link href={'/auth/register'} className='link-underline link-underline-opacity-0 main-color border py-1 px-3 rounded-3 register-shadow '>Register</Link></span>
                    </div>

                    {/* auth pages */}
                    {children}

                </section>
            </main>
        </div>

    )
}