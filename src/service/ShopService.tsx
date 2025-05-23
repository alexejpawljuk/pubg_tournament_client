import {create} from "zustand"
import {IShopProduct} from "../component/shop/ShopProduct"
import {shopProducts} from "../DATA/shopProduct"
import axios from "axios"
import {API} from "../appConfig";
import premiumAccount from "../image/svg/high-quality.svg"
import ticketImage from "../image/svg/ticket.svg"

interface IShopService {
    products: IShopProduct[]
    shopProductsFetch: () => Promise<void>
}

export const ShopService = create<IShopService>(setState => {
    return {
        products: [],
        async shopProductsFetch() {
            // const products = await shopProducts
            // setState(state => ({...state, products }))
            // const {data} = await axios.get<IShopProduct[]>("http://localhost:8080/shop/products")
            const {data} = await axios.get<IShopProduct[]>(API.URL + "/shop/products")
            data.map(product => {
                if (product.title === "Premium account") product.avatarPath = premiumAccount
                else if (product.title === "Ticket") product.avatarPath = ticketImage
                else return product
            })
            setState(state => ({...state, products: data}))
        }
    }
})
