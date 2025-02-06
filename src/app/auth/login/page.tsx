'use client'
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import * as yup from 'yup';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik'
import { useState } from 'react';
import LoadingPage from '@/components/common/LoadingPage';


export default function Login() {


    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    const [loading, isLoading] = useState(false)

    const showPassword = () => {
        setShow(!show)
    }

    const validationSchema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async function (values) {
            isLoading(true)
            const user = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false
            });
            if (user?.ok) {
                window.location.href = user.url || '/'
                isLoading(false)
                return
            }

            setError(user?.error || 'something went wrong, please try again')
            isLoading(false)
        }
    });
    return (
        <>
            {loading ? <LoadingPage /> :
                <div className="container my-5">
                    <div className="w-75 px-4 m-auto ">
                        <h6 className='fs-5 fw-bolder'>Sign In</h6>
                        <form onSubmit={formik.handleSubmit} method="post">

                            {/* email input */}
                            <div className="position-relative pb-4">
                                <input
                                    autoComplete="off"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} type="email" name='email'
                                    className={`form-control input-shadow p-2  ${formik.touched.email && formik.values.email == '' ? "border-danger " : ""}`}
                                    placeholder='Enter Email' />

                                {formik.errors.email && formik.touched.email && (<div className="alert alert-danger py-0 position-absolute">{formik.errors.email}</div>)}
                            </div>

                            {/* password input */}
                            <div className="position-relative py-2">
                                <input
                                    autoComplete="off"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} type={show ? "" : "password"} name='password'
                                    className={`form-control input-shadow p-2 ${formik.touched.password && formik.values.password == '' ? "border-danger" : ''}`}
                                    placeholder='Enter Password' />

                                <div className='position-absolute top-50 end-0 translate-middle show-password cursor-pointer ' onClick={showPassword}><VscEye /></div>

                                {formik.errors.password && formik.touched.password && (<div className="alert alert-danger py-0 position-absolute">{formik.errors.password}</div>)}
                            </div>
                            <div className="d-flex justify-content-end ">
                                <Link href={'/auth/forgetPassword'} className='main-color link-underline link-underline-opacity-0 '>Recover password?</Link>
                            </div>
                            <div className=" my-4">
                                {error && <div className="alert alert-danger py-1  ">{error}</div>}
                                <button type='submit' className='btn w-100 rounded-4 py-2 main-button'>Sign in</button>
                            </div>
                        </form>
                        <div className='continue-line d-flex justify-content-center '>
                            <p>Or Continue with</p>
                        </div>

                        {/* login with providers */}
                        <div className='d-flex justify-content-between mt-3 '>
                            <div onClick={() => signIn("google", { callbackUrl: '/', redirect: true, })} className='fs-2 icons cursor-pointer'><FcGoogle /></div>
                            <div onClick={() => signIn("facebook", { callbackUrl: '/', redirect: true, })} className='fs-2 icons facebook cursor-pointer'><FaFacebook /></div>
                            <div className='fs-2 icons cursor-pointer '><FaTwitter /></div>
                            <div className='fs-2 icons apple cursor-pointer'><FaApple /></div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

