import { TailSpin } from 'react-loader-spinner'

export default function LoadingPage() {
    return (
        <div className="position-fixed h-100 top-0 bottom-0 end-0 start-0 d-flex align-items-center justify-content-center bg-black opacity-25 ">

            <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#4461F2"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}
