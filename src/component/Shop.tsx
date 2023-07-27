import React, {FC, ReactNode, useState} from 'react'
import {Avatar, Card, CardProps, Divider, Input, InputNumber, Space, Tag, theme} from 'antd'
import {ShoppingCartOutlined, InfoCircleOutlined} from "@ant-design/icons"
import Meta from "antd/es/card/Meta"

import coinsImage from '../image/coins.png'
import ticketImage from "../image/ticket.png"
import premiumAccount from "../image/high-quality.png"

import {GrFormAdd} from "react-icons/gr"
import {AiOutlineMinus} from "react-icons/ai"
import {uid} from "uid";


interface IUnitCardData {
    title: string
    price: number
    avatarPath: string
}

interface IUnitCard {
    data: IUnitCardData
    children?: ReactNode
}

const UnitCard: FC<IUnitCard> = ({data}) => {
    const {title ,price, avatarPath} = data

    return (
        <Card
            style={{margin: 16, width: 210}}
            hoverable
            size="small"
            extra={
                <span style={{color: "rgba(255, 255, 255, 0.65)"}}>
                    {`${price} TOKEN`}
                </span>
            }
            // headStyle={{background: "#001529"}}
            actions={[
                <ShoppingCartOutlined key="buy"/>,
                <InfoCircleOutlined key="shop_unit_info"/>
            ]}
        >
            <Meta
                avatar={<Avatar src={avatarPath}/>}
                title={title}
                description={
                    <Space direction={"vertical"}>
                        <span>Total tokens: 10</span>
                        <Input type="number" min={1} max={100} defaultValue={1} size="small" style={{width: 60}}/>
                    </Space>
                }
                key={"premium_account"}
            />
        </Card>
    )
}


const Shop = () => {
    const {token: {colorBorder, borderRadius, colorBgLayout}} = theme.useToken()
    const [shopItems, setShopItems] = useState<IUnitCardData[]>([
        {price: 10, avatarPath: premiumAccount, title: "Premium account", },
        {price: 0.1, avatarPath: coinsImage, title: "Coin", },
        {price: 1, avatarPath: ticketImage, title: "Ticket", },
    ])


    const styles = {
        display: "flex",
        justifyContent: "space-between",
        overflow: "scroll",
        border: "1px solid",
        borderColor: colorBorder,
        borderRadius: borderRadius,
        background: colorBgLayout
    }

    return (
        <Space style={{display: "block"}}>
            <Divider orientation="center" style={{height: 30}}>Shop</Divider>

            <Space wrap style={{justifyContent: "space-between"}}>
                {shopItems?.map(shopItem => <UnitCard key={uid()} data={shopItem}/>)}
            </Space>
        </Space>
    )
}

export default Shop