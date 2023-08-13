import {IShopProduct} from "../component/shop/ShopProduct"
import premiumAccount from "../image/svg/high-quality.svg"
// import coinsImage from "../image/svg/coins.svg"
import ticketImage from "../image/svg/ticket.svg"



export const shopProducts = new Promise<IShopProduct[]>(resolve => {
    const products: IShopProduct[] = [
        {
            price: 10,
            avatarPath: premiumAccount,
            title: "Premium account",
            description: "A premium account allows the playerList to participate in free tournaments and unlocks a multitude of other opportunities.",
        },
        {
            price: 1,
            avatarPath: ticketImage,
            title: "Ticket",
            description: "This is an entry ticket to the tournaments organized by the administration of this gaming portal or sponsors."
        },
    ]

    setTimeout(() => {
        resolve(products)
    }, 2000)
})