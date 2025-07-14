import type { TLoading } from "@/types"
import { CategoriesSkeleton } from "../Skeletons/CategorySkeletons/CategorySkeletons";
import { ProductSkeleton } from "../Skeletons/ProductSkeletons/ProductSkeletons";
import { CartSkeleton } from "../Skeletons/CartSkeletons/CartSkeletons";
import LottieHandlers from "../LottieHandlers/LottieHandlers";
import OrderSkeletons from "../Skeletons/OrderSkeletons/OrderSkeletons";

// dynamic components
const skeletonsType = {
    cart: CartSkeleton,
    product: ProductSkeleton,
    category: CategoriesSkeleton,
    orders: OrderSkeletons
}

interface IPropsCategories {
    status: TLoading;
    error: string | null;
    children: React.ReactNode;
    type: keyof typeof skeletonsType;
}


export const LoadingAndError = ({ status, error, type, children }: IPropsCategories) => {

    const ComponentLoading = skeletonsType[type]

    if (status === "pending") return <ComponentLoading />
    if (status === "failed" || error) return <LottieHandlers type="Error" message={error as string} error={true} />

    return <> {children} </>
}
