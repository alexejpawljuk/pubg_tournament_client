import {create} from "zustand"
import {IShopProduct} from "../component/shop/ShopProduct"
import {shopProducts} from "../DATA/shopProduct"

interface IShopService {
    products: IShopProduct[]
    shopProductsFetch: () => Promise<void>
}

export const ShopService = create<IShopService>(setState => {
    return {
        products: [],
        async shopProductsFetch() {
            const products = await shopProducts
            setState(state => ({...state, products }))
        }
    }
})
