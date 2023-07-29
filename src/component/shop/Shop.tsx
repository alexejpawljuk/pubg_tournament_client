import React, {useState} from 'react'
import {Col, Divider, Row, Space, theme} from 'antd'
import ShopItem, {IShopItemData} from "./ShopItem"
import {uid} from "uid"

import coinsImage from '../../image/coins.png'
import ticketImage from "../../image/ticket.png"
import premiumAccount from "../../image/high-quality.png"
import ProfileCard from "../profile/ProfileCard";
import shopItem from "./ShopItem";




const Shop = () => {
    const {token: {colorBgContainer}} = theme.useToken()


    const [shopItems, setShopItems] = useState<IShopItemData[]>([
        {price: 10, avatarPath: premiumAccount, title: "Premium account",},
        {price: 0.1, avatarPath: coinsImage, title: "Coin",},
        {price: 1, avatarPath: ticketImage, title: "Ticket",},
    ])

    return (
        // <Space style={{display: "block"}}>
        //     <Divider orientation="center" style={{height: 30}}>Shop</Divider>
        //
        //     <Space wrap style={{justifyContent: "space-between"}}>
        //         {shopItems?.map(shopItem => <ShopItem key={uid()} data={shopItem}/>)}
        //     </Space>
        // </Space>
        <Col>
            <Row>
                <Col flex={"auto"}>
                    <Divider type="horizontal" orientation="center">
                        Shop
                    </Divider>
                </Col>
            </Row>

            <Row justify="center" gutter={[20, 0]} style={{background: colorBgContainer, padding: "24px", margin: 0}}>

                {shopItems.map(shopItem => <Col key={uid()} style={{width: 270, height: 350}}><ShopItem data={shopItem}/></Col>)}

            </Row>
        </Col>
    )
}

export default Shop