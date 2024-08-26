import { APP_CONFIG } from "../config";
import axios, { AxiosInstance } from "axios";
import { ProductData } from "../types/product";
import Swal from "sweetalert2";

class ProductService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create();
    }

    public fetchProductsList() {
      return new Promise<ProductData>((resolve, reject) => {
        this.axiosInstance
          .get(`${APP_CONFIG.API_URL}/Products`)
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
}

export default ProductService;