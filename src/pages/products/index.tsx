import ProductsView from "@/components/views/products";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const getAllProducts = async () => {
        const { data } = await productServices.getAllProducts()
        setProducts(data.data)
    }
    useEffect(() => {
        getAllProducts()
    }, [])

    return <ProductsView products={products} />
}

export default ProductsPage