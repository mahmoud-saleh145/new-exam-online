'use client'
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { signIn } from 'next-auth/react';
import * as yup from "yup"
import { useFormik } from 'formik'
import { useState } from 'react';
import { JSON_HEADER } from '@/lib/constants/api.constants';
import LoadingPage from '@/components/common/LoadingPage';
import NewPassword from './../newPassword/NewPassword';


export default function VerifyCode(props: any) {

    const email = props.email


    const [data, setData] = useState('')
    const [loading, isLoading] = useState(false)
    const [error, setError] = useState('')


    async function resendCode(email: any) {
        isLoading(true)
        const res = await fetch('https://exam.elevateegy.com/api/v1/auth/forgotPassword', {
            body: JSON.stringify(
                email
            ),
            headers: { ...JSON_HEADER },
            method: 'POST'
        })
        // const result = await res.json()
        isLoading(false)
        return res
    }

    const validationSchema = yup.object({
        resetCode: yup.string().required(),

    });


    const formik = useFormik({
        initialValues: {
            resetCode: '',

        },
        validationSchema,
        onSubmit: async function (values) {
            isLoading(true)
            const res = await fetch('https://exam.elevateegy.com/api/v1/auth/verifyResetCode', {
                body: JSON.stringify(
                    values
                ),
                headers: { ...JSON_HEADER },
                method: 'POST'
            })
            const result = await res.json()

            if (result?.status == 'Success') {
                isLoading(false)
                setData(result.status)
            }

            isLoading(false)
            setError(result.message || 'something went wrong, please try again')

        }


    });


    return (
        <>

            {loading ? <LoadingPage /> :
                data === 'Success' ? <NewPassword />
                    : <div className='container my-5'>
                        <div className="w-75 px-4 m-auto ">
                            <h6 className='fs-5 fw-bolder'>Verify Code</h6>
                            <form onSubmit={formik.handleSubmit} method="post">

                                {/* resetCode input */}
                                <div className="position-relative pb-4">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <input
                                        autoComplete="off"
                                        value={formik.values.resetCode}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name='resetCode' type="text" className={` form-control input-shadow p-2  ${(formik.touched.resetCode && (formik.values.resetCode === '' || formik.errors.resetCode)) ? "border-danger" : ""} `} placeholder='Enter reset Code' ></input>
                                    {formik.errors.resetCode && formik.touched.resetCode && (<div className="alert alert-danger  py-0 position-absolute ">{formik.errors.resetCode}</div>)}
                                </div>

                                {/* resend the reset code */}
                                <div className="d-flex justify-content-end">
                                    <div>Didn't receive a reset Code? <span onClick={() => { resendCode(email) }} className='main-color link-underline link-underline-opacity-0 mt-1 fw-semibold cursor-pointer '>Resend </span></div>
                                </div>

                                <div className=" my-4">
                                    {error && <div className="alert alert-danger py-1  ">{error}</div>}
                                    <button type='submit' className='btn btn-primary w-100 rounded-4 py-2 main-button ' >Verify</button>
                                </div>
                            </form>

                            <div className='continue-line d-flex justify-content-center '>
                                <p className=''>Or Continue with</p>
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
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

