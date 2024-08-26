"use client"
import React,{ useEffect, useState} from 'react'
import TableFrom from '../../components/TableFrom';
import Link from 'next/link'
import CartService from "../../services/cart.service";
import Swal from "sweetalert2";

type Props = {}

export default function cart({}: Props) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const cartService = new CartService();
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const result = await cartService.fetchCartList();
                setData(result);
            } catch (err) {
                setError('Failed to fetch Cart');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);
    const handleSuccess = () => {
        window.location.href = "/cart"
    };
    
    const handleDeleteAll = async () => {
        let param = new Array();
        data.map((item)=>{
            param.push(item.productId);
        })
        await cartService.RemoveToCartAll(param);
        const result = await Swal.fire({
            title: "Romove!",
            text: "",
            icon: "success",
            confirmButtonText: 'OK'
          });
          if (result.isConfirmed) {
              window.location.href = "/cart"
          }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Link className='btn btn-secondary mr-2' href={`/product`}>
                เพิ่มสินค้า
            </Link>
            <button onClick={() => handleDeleteAll()} className="btn btn-danger mr-2">
                ล้างรายการทั้งหมด
            </button>
            <Link className='btn btn-secondary mr-2' href={`/checkout`}>
                ชำระเงิน
            </Link>
            <TableFrom data={data} onSuccess={handleSuccess}/>
        </div>
    )
}