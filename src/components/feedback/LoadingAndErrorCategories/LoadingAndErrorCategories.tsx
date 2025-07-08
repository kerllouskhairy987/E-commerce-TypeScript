import Error from "@/pages/Error";
import { CategoriesSkeleton } from "@/skeleton/skeleton";
import type { TLoading } from "@/types"

// LoadingAndError for categories
interface IPropsCategories {
    status: TLoading;
    error: string | null;
    children: React.ReactNode;
}
export const LoadingAndErrorCategories = ({ status, error, children }: IPropsCategories) => {
    
    if (status === "pending") return <CategoriesSkeleton />
    if (status === "failed" || error) return <Error />
    
    return <> {children} </>
}
