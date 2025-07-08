import Error from "@/pages/Error";
import { CartSkeleton } from "@/skeleton/skeleton";
import type { TLoading } from "@/types";

interface IProps {
    status: TLoading;
    error: string | null;
    children: React.ReactNode;
}
export const LoadingAndErrorCart = ({ status, error, children }: IProps) => {

    if (status === "pending") return <CartSkeleton />
    if (status === "failed" || error) return <Error />

    return <> {children} </>
}

