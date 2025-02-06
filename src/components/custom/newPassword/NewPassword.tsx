'use client'
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { signIn } from 'next-auth/react';
import * as yup from 'yup';
import { useFormik } from 'formik'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/components/common/LoadingPage';
import { JSON_HEADER } from '@/lib/constants/api.constants';

export default function NewPassword() {

    const router = useRouter();
    const [loading, isLoading] = useState(false)
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)

    const validationSchema = yup.object({
        email: yup.string().email().required(),
        newPassword: yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema,
        onSubmit: async function (values) {

            isLoading(true)
            const res = await fetch('https://exam.elevateegy.com/api/v1/auth/resetPassword', {
                body: JSON.stringify(
                    values
                ),
                headers: { ...JSON_HEADER },
                method: 'PUT'
            })
            const result = await res.json()

            if (result?.message == 'success') {
                isLoading(false)
                router.push('/auth/login')
            }
            isLoading(false)
            setError(result.message || 'something went wrong, please try again')

        }

    });


    const showPassword = () => {
        setShow(!show)
    }

    return (
        <>
            {loading ? <LoadingPage />
                :
                <div className="container my-5">
                    <div className="w-75 px-4 m-auto ">
                        <h6 className='fs-5 fw-bolder'>Set a Password</h6>
                        <form onSubmit={formik.handleSubmit} method="put" >

                            {/* email for create new password */}
                            <div className="position-relative pb-4">
                                <input
                                    autoComplete="off"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name='email' type="email" className={`form-control input-shadow p-2  ${formik.touched.email && formik.values.email == '' || formik.errors.email ? "border-danger" : ""}`} placeholder='Enter Your Email' ></input>
                                {formik.errors.email && formik.touched.email && (<div className="alert alert-danger py-0 position-absolute">{formik.errors.email}</div>)}
                            </div>

                            {/* new password */}
                            <div className=" position-relative py-2">
                                <input
                                    autoComplete="off"
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name='newPassword' type={show ? "" : "password"} className={`form-control input-shadow p-2  ${formik.touched.newPassword && formik.values.newPassword == '' || formik.errors.newPassword ? "border-danger" : ""}`} placeholder='Create a Password' ></input>
                                <div className='position-absolute top-50 end-0 translate-middle show-password cursor-pointer' onClick={showPassword}><VscEye /></div>
                                {formik.errors.newPassword && formik.touched.newPassword && (<div className="alert alert-danger py-0 position-absolute">{formik.errors.newPassword}</div>)}

                            </div>
                            <div className="my-4">
                                {error && <div className="alert alert-danger py-1  ">{error}</div>}

                                <button type='submit' className='btn btn-primary w-100  rounded-4 py-2 main-button ' >Sign in</button>
                            </div>
                        </form>
                        <div className='continue-line d-flex justify-content-center '>
                            <p className=''>Or Continue with</p>
                        </div>
                        <div className='d-flex justify-content-between mt-3 '>
                            <div onClick={() => signIn("google", { callbackUrl: '/', redirect: true, })} className='fs-2 icons cursor-pointer'><FcGoogle /></div>
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
