import React, {FC, ReactNode} from 'react'
import {Avatar, Card, CardProps, Divider, Space, Tag, theme} from 'antd'
import {ShoppingCartOutlined, InfoCircleOutlined} from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import coinsImage from '../image/coins.png'

const ShopUnit: FC<{ children?: ReactNode, props?: CardProps }> = ({children, props}) => {
    return (

        <Card
            style={{margin: 16, width: 300}}
            actions={[
                <ShoppingCartOutlined key="buy"/>,
                <InfoCircleOutlined key="shop_unit_info"/>
            ]}
        >
            <Meta
                avatar={<Avatar src={coinsImage}/>}
                title="mlkmlkmlkn"
                description={"Price: 10"}
            />
        </Card>
    )
}

const Shop = () => {
    const {token: {colorBorder, borderRadius, colorBgLayout}} = theme.useToken()
    const styles = {
        display: "flex",
        justifyContent: "space-between",
        overflow: "scroll",
        border: "1px solid",
        borderColor: colorBorder,
        borderRadius: borderRadius,
        background: colorBgLayout
    }

    const onClickBalance = () => {
        console.log("Click on balance")
    }

    return (
        <Space style={{display: "block"}}>
            <Space style={{display: "flex", justifyContent: "end"}}>
                <Tag
                    onClick={onClickBalance}
                    color="processing"
                > Balance: 0
                </Tag>
            </Space>

            <Divider orientation="left">Shop</Divider>

            <Space style={{display: "block"}}>
                <div style={styles}>
                    <ShopUnit/>
                    <ShopUnit/>
                    <ShopUnit/>
                </div>
            </Space>
            <Space>

            </Space>
        </Space>
    )
}

export default Shop