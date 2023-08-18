import React, {FC, ReactNode, useEffect, useState} from 'react'
import {Col, Divider, Row, Skeleton, theme} from 'antd'
import ShopProduct from "./ShopProduct"
import {uid} from "uid"
import {ShopService} from "../../service/ShopService"

interface IShop {

}

interface IShopHeader {
    title: string
}

interface IShopProductContainer {
    children: ReactNode
    loading: boolean
}

interface IShopProductWrap {
    children: ReactNode
}

const ShopHeader: FC<IShopHeader> = ({title}) => {

    return (
        <Row >
            <Col flex={"auto"}>
                <Divider type="horizontal" orientation="center">{title}</Divider>
            </Col>
        </Row>
    )
}

const ShopProductContainer: FC<IShopProductContainer> = ({children, loading}) => {
    const {token} = theme.useToken()

    if (loading)
        return (
            <Skeleton active />
        )


    return (
        <Row
            justify={"center"}
            gutter={[0, 0]}
            style={{
                background: token.colorBgLayout,
                padding: "24px",
                margin: 0,
            }}
        >{children}</Row>
    )
}

const ShopProductWrap: FC<IShopProductWrap> = ({children}) => {
    return (
        <Col style={{width: 200}}>
            {children}
        </Col>
    )
}

const Shop: FC<IShop> = () => {
    const {token} = theme.useToken()
    const {products, shopProductsFetch} = ShopService()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        shopProductsFetch()
            .then(() => setLoading(false))
            .catch(console.log)
    }, [])

    return (
        <Col>
            <ShopHeader title="Shop"/>

            <ShopProductContainer loading={loading}>
                {products.map(product =>
                    <ShopProductWrap key={uid()}>
                        <ShopProduct product={product}/>
                    </ShopProductWrap>
                )}
            </ShopProductContainer>
        </Col>
    )
}

export default Shop