"use client"
import React,{ useEffect, useState } from 'react'
import Link from 'next/link'
import ProductService from "../../services/products.service";
import CartService from "../../services/cart.service";
import { ProductData } from '@/types/product';

type Props = {
    data:  Array<ProductData>;
    onSuccess: () => void;
}

export default function Product({}: Props) {
    const cartService = new CartService();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productService = new ProductService();
                const result = await productService.fetchProductsList();
                setData(result);
            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleAddtoCart = async (id:number) => {
       await cartService.addToCart(id);
    }
    return (
        <div className="container text-center">
                <h1>Product List</h1>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-3">
                <Link className='btn btn-secondary mr-2' href={`/cart`}>
                    Cart
                </Link>
                </div>
                <hr></hr>
                <div className="row">
                {data.map((item: ProductData)=> (
                    <div className="col-md-4 mb-3" key={item.id}>
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <button onClick={() => handleAddtoCart(item.id)} className="btn btn-primary">
                                    AddToCart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}  
                </div>
            </div>
    )
}