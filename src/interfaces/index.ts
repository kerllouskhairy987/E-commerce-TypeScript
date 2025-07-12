export interface ICategory {
    id?: number,
    title: string,
    prefix: string,
    img: string
}

export interface IProduct {
    id: number,
    title: string,
    cat_prefix: string;
    price: number,
    img: string;
    max?: number;
    quantity?: number;
    isLiked?: boolean;
    isAuthenticated?: boolean;
}