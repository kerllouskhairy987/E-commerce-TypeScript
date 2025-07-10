// lottie files
import LottieHandlers from '@/components/feedback/LottieHandlers/LottieHandlers';

const Error = () => {

    return (
        <div className='notFound'>
            <div className='d-flex align-items-center justify-content-center flex-column'>
                <LottieHandlers type="NotFound" message='Page not found' error={true} />

            </div>
        </div>
    )
}

export default Error