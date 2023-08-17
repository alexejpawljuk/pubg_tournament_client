import React, {CSSProperties, FC, ReactNode, useEffect, useRef, useState} from 'react'
import {Avatar, Card, Col, ConfigProvider, Divider, theme} from "antd"


interface IHeaderFeedItem {
    content: string
}

const HeaderFeedItem: FC<IHeaderFeedItem> = ({content}) => {
    const {token} = theme.useToken()

    const styles: CSSProperties = {
        width: 350,
        // paddingBottom: 15,
        margin: "0 20px",
        background: token.colorBgLayout
    }

    return (
        // <div style={styles}>
        //     <Row justify="center" style={{width: "100%"}}>Daily</Row>
        //     <Row style={{width: "100%"}}>Daily</Row>
        //     <Row style={{width: "100%"}}>Daily</Row>
        //     <Row style={{width: "100%"}}>Daily</Row>
        // </div>

        <Card size="small" bordered={false} style={styles}>
            {/*<p>Card content Card content Card content Card content</p>*/}
            <Divider style={{width: 300, margin: 0}} orientation="right">Card content</Divider>
            <Col>
                <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${1}`}/>

            </Col>
            <Col>
                <p>Card content</p>
            </Col>
            {/*<p>Card content</p>*/}
        </Card>
    )
}


const HeaderFeed = () => {
    const {token} = theme.useToken()
    const feedRef = useRef<HTMLDivElement>(null)
    const [feed, setFeed] = useState<ReactNode[]>([])


    const styles: CSSProperties = {
        display: "flex",
        overflowX: "auto",
        width: "max-content",
        maxWidth: "100",
        whiteSpace: "nowrap",
        height: 180,
        paddingTop: "20px",
        marginBottom: 15,
        borderBottom: "0.4px solid",
        borderBottomColor: token.colorBorder,
        background: token.colorBgLayout,
    }

    useEffect(() => {
        console.log("Scroll width", feedRef.current?.scrollWidth)
        setFeed(() => new Array(20).fill(<></>))
    }, [])


    const onScroll = (event: React.UIEvent<HTMLElement>) => {
        // console.log("Scroll:", event)
    }

    const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
        e.stopPropagation() // Handy if you want to prevent event bubbling to scrollable parent
        const scrollLeftPosition = e.currentTarget.scrollLeft
        console.log(scrollLeftPosition)
        // e.currentTarget.scrollTo({left: scrollLeftPosition + 1})
    };


    return (

        <div
            onScroll={handleScroll}
            id="header_feed"
            ref={feedRef}
            style={styles}
        >
            <ConfigProvider
                theme={{token: {colorBgLayout: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,99,121,0) 0%, rgba(0,212,255,0.2) 100%)"}}}>
                {feed.map((feedData, index) => <HeaderFeedItem content={index.toString()} key={index}/>)}
            </ConfigProvider>
        </div>

    )
}

export {HeaderFeed}