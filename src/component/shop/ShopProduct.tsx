import React, {FC, ReactNode} from "react"
import {Avatar, Card, Input, Space, Tooltip} from "antd"
import {InfoCircleOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import {useLogger} from "../../hook/useLogger"

export interface IShopProduct {
    title: string
    price: number
    avatarPath: string
    description: string
}

interface IShopItem {
    product: IShopProduct
    children?: ReactNode
}

const ShopProduct: FC<IShopItem> = ({product}) => {
    useLogger("Render shop item")
    const {title, price, avatarPath, description} = product

    const onBuyItem = () => {
        console.log("Buy",)
    }

    const onInfo = () => {
        console.log("Info")
    }

    return (
        <Card
            style={{margin: 16,}}
            hoverable
            size="small"
            extra={
                <div style={{color: "rgba(255, 255, 255, 0.65)"}}>
                    {`${price} TOKEN`}
                </div>
            }
            actions={[
                <ShoppingCartOutlined key="buy" onClick={onBuyItem}/>,
                <Tooltip title={description}>
                    <InfoCircleOutlined key="shop_unit_info" onClick={onInfo}/>
                </Tooltip>
            ]}
        >
            <Meta
                avatar={<Avatar src={avatarPath}/>}
                title={title}
                description={
                    <Space size={[10, 0]}>
                        <Input type="number" min={1} max={100} defaultValue={1} size="small" style={{width: 60}}/>
                        <span>{` / ${10}`}</span>
                    </Space>
                }
                key={"premium_account"}
            />
        </Card>
    )
}

export default ShopProduct