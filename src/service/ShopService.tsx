import {create} from "zustand"
import {IShopProduct} from "../component/shop/ShopProduct"
import {shopProducts} from "../DATA/shopProduct"
import axios from "axios"

interface IShopService {
    products: IShopProduct[]
    shopProductsFetch: () => Promise<void>
}

export const ShopService = create<IShopService>(setState => {
    return {
        products: [],
        async shopProductsFetch() {
            const products = await shopProducts
            // setState(state => ({...state, products }))
            const {data} = await axios.get<IShopProduct[]>("http://localhost:8080/shop/products")
            setState(state => ({...state, products: data}))
        }
    }
})
