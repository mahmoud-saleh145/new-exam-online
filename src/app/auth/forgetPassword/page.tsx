'use client'
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import * as yup from "yup"
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { JSON_HEADER } from '@/lib/constants/api.constants';
import VerifyCode from '@/components/custom/verifyCode/verifyCode';
import LoadingPage from '@/components/common/LoadingPage';


export default function forgetPassword() {

    const [data, setData] = useState('')
    const [emailVerify, setEmailVerify] = useState({})
    const [loading, isLoading] = useState(false)
    const [error, setError] = useState('')

    let validationSchema = yup.object({
        email: yup.string().email().required(),
    });

    let formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: async function (values) {
            isLoading(true)

            const res = await fetch('https://exam.elevateegy.com/api/v1/auth/forgotPassword', {
                body: JSON.stringify(
                    values
                ),
                headers: { ...JSON_HEADER },
                method: 'POST'
            })
            const result = await res.json()
            if (result?.message == 'success') {
                setData(result.message)
                setEmailVerify(values)
                isLoading(false)
            }
            console.log(result);

            setError(result?.message || 'something went wrong, please try again')
            isLoading(false)
        }
    });


    return (
        <>

            {loading ? <LoadingPage /> :
                data === 'success' ? <VerifyCode email={emailVerify} /> :
                    <div className="container my-5">
                        <div className="w-75 px-4 m-auto ">
                            <h6 className='fs-5 fw-bolder'>Forgot your password?</h6>
                            <form onSubmit={formik.handleSubmit} method="post">

                                {/* email input */}
                                <div className="position-relative pb-2">
                                    <input
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name='email' type="email" className={`form-control input-shadow p-2  ${formik.touched.email && formik.values.email == '' || formik.errors.email ? "border-danger" : ""}`} placeholder='Enter Email' />
                                    {formik.errors.email && formik.touched.email && (<div className="alert alert-danger  py-0 position-absolute ">{formik.errors.email}</div>)}

                                </div>
                                <div className="d-flex justify-content-end ">
                                    <Link href={'/auth/forgetPassword'} className='main-color link-underline link-underline-opacity-0 '>Recover password?</Link>
                                </div>

                                <div className=" my-4">
                                    {error && <div className="alert alert-danger py-1  ">{error}</div>}
                                    <button type='submit' className='btn w-100 rounded-4 py-2 main-button'>Sign in</button>
                                </div>
                            </form>
                            <div className='continue-line d-flex justify-content-center'>
                                <p className=''>Or Continue with</p>
                            </div>

                            {/* login with providers */}
                            <div className='d-flex justify-content-between mt-3 '>
                                <div onClick={() => signIn("google", { callbackUrl: '/', redirect: true, })} className='fs-2 icons  cursor-pointer'><FcGoogle /></div>
                                <div onClick={() => signIn("facebook", { callbackUrl: '/', redirect: true, })} className='fs-2 icons facebook cursor-pointer'><FaFacebook /></div>
                                <div className='fs-2 icons cursor-pointer'><FaTwitter /></div>
                                <div className='fs-2 icons apple cursor-pointer'><FaApple /></div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
