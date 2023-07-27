import React, {FC, ReactNode} from 'react'
import {Avatar, Card, CardProps, Divider, InputNumber, Space, Tag, theme} from 'antd'
import {ShoppingCartOutlined, InfoCircleOutlined} from "@ant-design/icons"
import Meta from "antd/es/card/Meta"

import coinsImage from '../image/coins.png'
import ticketImage from "../image/ticket.png"
import premiumAccount from "../image/high-quality.png"
import contractImage from "../image/contract.png"

import {GrFormAdd} from "react-icons/gr"
import {AiOutlineMinus} from "react-icons/ai"
import { createFromIconfontCN } from '@ant-design/icons';

const MyIcon = createFromIconfontCN({

})

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
    const {token: {colorBorder, borderRadius, colorBgLayout, Menu}} = theme.useToken()
    const styles = {
        display: "flex",
        // width: 1000,
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
                    // color={Menu?.colorItemBg}
                    color="#001529"
                    style={{
                        color: "rgba(255, 255, 255, 0.65)",
                        padding: "10px 5px"
                }}
                > Balance: 10 TOKEN
                </Tag>
            </Space>

            <Divider orientation="center">Shop</Divider>

            <Space style={{display: "block"}}>
                <div style={styles}>
                    <Card
                        style={{margin: 16, width: 300}}
                        hoverable
                        size="small"
                        extra={<span style={{color: "rgba(255, 255, 255, 0.65)"}}>4 TOKEN</span>}
                        headStyle={{background: "#001529"}}
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

                                   <span>Total tokens: 10</span>
                                   <InputNumber
                                       defaultValue={10}
                                       min={1}
                                       max={100}
                                       controls={false}
                                       size="small"
                                       addonAfter={<GrFormAdd key="buy"/>}
                                       addonBefore={<AiOutlineMinus key="buy"/>}

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
                        hoverable
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
                        hoverable
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