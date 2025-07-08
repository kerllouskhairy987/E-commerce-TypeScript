import Error from "@/pages/Error";
import { ProductSkeleton } from "@/skeleton/skeleton";
import type { TLoading } from "@/types";

interface IPropsProducts {
    status: TLoading;
    error: string | null;
    children: React.ReactNode;
}
export const LoadingAndErrorProducts = ({ status, error, children }: IPropsProducts) => {

    if (status === "pending") return <ProductSkeleton />
    if (status === "failed" || error) return <Error />

    return <> {children} </>
}
