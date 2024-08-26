import React from 'react'
import CartService from "../services/cart.service";
import { CartListData } from '../types/product.d';
import Link from 'next/link'
import Swal from "sweetalert2";

type Props = {
    data:  Array<CartListData>;
    onSuccess: () => void;
}

export default function TableFrom({data, onSuccess}: Props) {
    const cartService = new CartService();
    const handleDelete = async (id:number) => {
        await cartService.RemoveToCart(id);
        const result = await Swal.fire({
            title: "Romove!",
            text: "",
            icon: "success",
            confirmButtonText: 'OK'
          });
          if (result.isConfirmed) {
              onSuccess();
          }
    }
    const handleAdd = async (id:number) => {
        await cartService.addToCart(id);
        // const result = await Swal.fire({
        //     title: "Add!",
        //     text: "",
        //     icon: "success",
        //     confirmButtonText: 'OK'
        //   });
        //   if (result.isConfirmed) {
        //       window.location.href = "/cart"
        //   }
    }
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ProductId</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data?.map((item:CartListData) => (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.productId}</td>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>
                            <button onClick={() => handleDelete(item.productId)} className="btn btn-danger mr-2">
                                -
                            </button>
                            <button onClick={() => handleAdd(item.productId)} className="btn btn-success">
                                +
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
    </div>
    )
}