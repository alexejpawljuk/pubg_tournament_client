import {create} from "zustand"
import {IShopProduct} from "../component/shop/ShopProduct"
import {shopProducts} from "../DATA/shopProduct"

interface IUseShop {
    products: IShopProduct[]
    shopProductsFetch: () => Promise<void>
}

export const useShop = create<IUseShop>(setState => {
    return {
        products: [],
        async shopProductsFetch() {
            const products = await shopProducts
            setState(state => ({...state, products }))
        }
    }
})
