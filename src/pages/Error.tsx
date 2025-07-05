// components
import Button from '@/components/ui/Button'
// react router dom
import { Link, useLocation, useRouteError, isRouteErrorResponse } from 'react-router'
// global styles
import "@/styles/global.css"

const Error = () => {
    const { pathname } = useLocation();

    const error = useRouteError()

    let errorStatus: number;
    let errorStatusText: string;

    if (isRouteErrorResponse(error)) {
        errorStatus = error.status;
        errorStatusText = error.statusText;
    } else {
        errorStatus = 404;
        errorStatusText = "Page not found";
    }


    return (
        <div className='notFound'>
            <h2>{errorStatus}</h2>
            <p>{errorStatusText}</p>
            <div className='d-flex align-items-center justify-content-center gap-3 mt-5'>
                <Link to={"/"} replace={true}>
                    <Button>Home</Button>
                </Link>
                <Link to={pathname} reloadDocument>
                    <Button>Refresh</Button>
                </Link>
            </div>
        </div>
    )
}

export default Error