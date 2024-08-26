import { APP_CONFIG } from "../config";
import axios, { AxiosInstance } from "axios";
import { ProductData } from "../types/product";
import Swal from "sweetalert2";

class CartService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create();
    }

    public fetchCartList() {
      return new Promise<ProductData>((resolve, reject) => {
        this.axiosInstance
          .get(`${APP_CONFIG.API_URL}/carts`)
          .then((response: any) => {
            resolve(response.data.data);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: error.response?.data?.message || "Something went wrong",
            });
            // window.location.href = "/"
            reject(error);
          });
      });
    }

    public addToCart(productId:number ) {
      return new Promise<number>((resolve, reject) => {
        this.axiosInstance
          .post(`${APP_CONFIG.API_URL}/Carts?productId=${productId}`)
          .then(async (response) => {
            resolve(response.data);
            console.log(response.data.status)
            if(response.data.success){
              // Swal.fire({
              //   title: "Add To Cart!",
              //   text: "",
              //   icon: "success",
              //   confirmButtonText: 'OK'
              // });
              const result = await Swal.fire({
                title: "Add To Cart!",
                text: "",
                icon: "success",
                confirmButtonText: 'OK'
              });
              if (result.isConfirmed) {
                  window.location.href = "/cart"
              }
            }else{
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: "จำนวนสินค้าไม่เพียงพอ",
              });
            }
          })
          .catch((error) => {
            if (error?.response?.data?.message) {
              console.log(error.response.data.message);
            }
            reject(error);
          });
      });
    }
    public RemoveToCart(id:number ) {
      return new Promise<number>((resolve, reject) => {
        this.axiosInstance
          .delete(`${APP_CONFIG.API_URL}/Carts/${id}`)
          .then((response) => {
            resolve(response.data);
            Swal.fire({
              title: "Delete To Cart!",
              text: "",
              icon: "success",
          });
          })
          .catch((error) => {
            if (error?.response?.data?.message) {
              console.log(error.response.data.message);
            }
            reject(error);
          });
      });
    }

    public RemoveToCartAll(data:any) {
      return new Promise<number>((resolve, reject) => {
        this.axiosInstance
          .post(`${APP_CONFIG.API_URL}/Carts/deleteall`,data)
          .then((response) => {
            resolve(response.data);
            Swal.fire({
              title: "Delete To Cart!",
              text: "",
              icon: "success",
          });
          })
          .catch((error) => {
            if (error?.response?.data?.message) {
              console.log(error.response.data.message);
            }
            reject(error);
          });
      });
    }

    public Checkout(data:any) {
      return new Promise<number>((resolve, reject) => {
        this.axiosInstance
          .post(`${APP_CONFIG.API_URL}/Carts/checkout`,data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            if (error?.response?.data?.message) {
              console.log(error.response.data.message);
            }
            reject(error);
          });
      });
    }
}

export default CartService;