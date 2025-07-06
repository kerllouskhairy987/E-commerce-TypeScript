import Error from "@/pages/Error";
import { CategoriesSkeleton, ProductSkeleton } from "@/skeleton/skeleton";
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

// LoadingAndError for products
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