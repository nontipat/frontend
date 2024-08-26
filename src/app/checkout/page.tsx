"use client"
import React,{ useEffect, useState} from 'react'
import TableFrom from '../../components/TableFrom';
import Link from 'next/link'
import CartService from "../../services/cart.service";
import { CartListData } from '../../types/product';
import Swal from "sweetalert2";

type Props = {}

export default function Checkout({}: Props) {
    // const [total, setTotal] = useState(0);
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
    const handleDeleteAll = async () => {
        let param = new Array();
        data.map((item)=>{
            param.push(item.productId);
        })
        await cartService.Checkout(param);
        const result = await Swal.fire({
            title: "ชำระเงินสำเร็จ!",
            text: "",
            icon: "success",
            confirmButtonText: 'OK'
          });
          if (result.isConfirmed) {
              window.location.href = "/product"
          }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    let total = data?.map(i => i.amount*i.price).reduce((sum, current) => sum + current);
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ProductId</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data?.map((item:CartListData) => (
                    <tr key={item.id}>
                        <td>{item.productId}</td>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>{item.price}</td>
                    </tr>
                    ))}
                    <tr>
                        <td align='right' colSpan={3}>ยอดที่ต้องชำระ </td>
                        <td>{total}</td>
                    </tr>
                </tbody>
            </table>
            <Link className='btn btn-secondary mr-2' href={`/product`}>
                เพิ่มสินค้า
            </Link>
            <button onClick={() => handleDeleteAll()} className="btn btn-danger mr-2">
                ชำระเงิน
            </button>
        </div>
    )
}