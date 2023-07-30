import React, {useState} from 'react'
import {Col, Divider, Row, theme} from 'antd'
import ShopItem, {IShopItemData} from "./ShopItem"
import {uid} from "uid"

import coinsImage from '../../image/coins.png'
import ticketImage from "../../image/ticket.png"
import premiumAccount from "../../image/high-quality.png"



const Shop = () => {
    const {token: {colorBgContainer}} = theme.useToken()


    const [shopItems, setShopItems] = useState<IShopItemData[]>([
        {price: 10, avatarPath: premiumAccount, title: "Premium account",},
        {price: 0.1, avatarPath: coinsImage, title: "Coin",},
        {price: 1, avatarPath: ticketImage, title: "Ticket",},
    ])

    return (
        <Col>
            <Row>
                <Col flex={"auto"}>
                    <Divider type="horizontal" orientation="center">
                        Shop
                    </Divider>
                </Col>
            </Row>

            <Row justify={"center"} gutter={[0, 0]} style={{background: colorBgContainer, padding: "24px", margin: 0}}>

                {shopItems.map(shopItem => <Col key={uid()} style={{width: 200}}>
                    <ShopItem data={shopItem}/>
                </Col>)}

            </Row>
        </Col>
    )
}

export default Shop