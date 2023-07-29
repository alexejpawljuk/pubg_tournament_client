import React, {FC, ReactNode} from "react"
import {Avatar, Card, Input, Space} from "antd"
import {InfoCircleOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import {useLogger} from "../../hook/useLogger";

export interface IShopItemData {
    title: string
    price: number
    avatarPath: string
}

interface IShopItem {
    data: IShopItemData
    children?: ReactNode
}

const ShopItem: FC<IShopItem> = ({data}) => {
    useLogger("Render shop item")
    const {title, price, avatarPath} = data

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
                <InfoCircleOutlined key="shop_unit_info" onClick={onInfo}/>
            ]}
        >
            <Meta
                avatar={<Avatar src={avatarPath}/>}
                title={title}
                description={
                    <>
                        <Space direction="vertical">
                            <span>
                                Description
                            </span>
                        </Space>
                        <Space size={[10, 0]}>
                            <Input type="number" min={1} max={100} defaultValue={1} size="small" style={{width: 60}}/>
                            <span>{` / ${10}`}</span>
                        </Space>
                    </>
                }
                key={"premium_account"}
            />
        </Card>
    )
}

export default ShopItem