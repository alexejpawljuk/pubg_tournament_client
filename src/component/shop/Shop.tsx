import React, {useState} from 'react'
import {Divider, Space} from 'antd'
import ShopItem, {IShopItemData} from "./ShopItem"
import {uid} from "uid"

import coinsImage from '../../image/coins.png'
import ticketImage from "../../image/ticket.png"
import premiumAccount from "../../image/high-quality.png"




const Shop = () => {
    const [shopItems, setShopItems] = useState<IShopItemData[]>([
        {price: 10, avatarPath: premiumAccount, title: "Premium account",},
        {price: 0.1, avatarPath: coinsImage, title: "Coin",},
        {price: 1, avatarPath: ticketImage, title: "Ticket",},
    ])

    return (
        <Space style={{display: "block"}}>
            <Divider orientation="center" style={{height: 30}}>Shop</Divider>

            <Space wrap style={{justifyContent: "space-between"}}>
                {shopItems?.map(shopItem => <ShopItem key={uid()} data={shopItem}/>)}
            </Space>
        </Space>
    )
}

export default Shop