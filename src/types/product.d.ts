export interface ProductData {
    id: number;
    name: string;
    price: number;
    amount: number;
}

export interface CartListData {
    id: number;
    productId: number;
    name: string;
    price: number;
    amount: number;
}