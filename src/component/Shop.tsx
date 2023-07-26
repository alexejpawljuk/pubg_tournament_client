import React, {FC, ReactNode} from 'react'
import {Avatar, Card, CardProps, Divider, InputNumber, Select, Space, Tag, theme} from 'antd'
import {ShoppingCartOutlined, InfoCircleOutlined} from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import coinsImage from '../image/coins.png'
import ticketImage from "../image/ticket.png"
import premiumAccount from "../image/high-quality.png"

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
                    <Card
                        style={{margin: 16, width: 300}}
                        actions={[
                            <ShoppingCartOutlined key="buy"/>,
                            <InfoCircleOutlined key="shop_unit_info"/>
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={premiumAccount}/>}
                            title="Premium account"
                            description={
                               <Space direction={"vertical"}>
                                   <span>Price: 1</span>
                                   <span>Total tokens: 10</span>
                                   <InputNumber
                                       style={{width: 50}}
                                       defaultValue={10}
                                       min={0}
                                       max={100}
                                       controls={true}
                                       size="small"

                                       // formatter={(value) => `${value}`}
                                       // parser={(value) => value!.replace('%', '')}
                                       onChange={e => {
                                           console.log(e)
                                       }}
                                   />

                               </Space>
                        }
                            key={"premium_account"}
                        />
                    </Card>

                    <Card
                        style={{margin: 16, width: 300}}
                        actions={[
                            <ShoppingCartOutlined key="buy"/>,
                            <InfoCircleOutlined key="shop_unit_info"/>
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={ticketImage}/>}
                            title="Ticket"
                            description={"Price: 10"}
                        />
                    </Card>

                    <Card
                        style={{margin: 16, width: 300}}
                        actions={[
                            <ShoppingCartOutlined key="buy"/>,
                            <InfoCircleOutlined key="shop_unit_info"/>
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={coinsImage}/>}
                            title="Coin"
                            description={"Price: 10"}
                        />
                    </Card>
                </div>
            </Space>
            <Space>

            </Space>
        </Space>
    )
}

export default Shop