import { Suspense } from "react"
import LottieHandlers from "../LottieHandlers/LottieHandlers"

const PageSuspenseFallback = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense
            fallback={
                <LottieHandlers type="LazyLoading" message="loading please wait ..." error={false} />
            }
        >
            {children}
        </Suspense>
    )
}

export default PageSuspenseFallback