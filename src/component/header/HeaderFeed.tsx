import React, {CSSProperties, FC, ReactNode, useEffect, useRef, useState} from 'react'
import {Avatar, Card, Col, ConfigProvider, Divider, Row, theme} from "antd"
import tournament, {IMatch} from "../match/Match";
import {MatchService} from "../../service/MatchService";
import Meta from "antd/es/card/Meta";
import {format} from "date-fns";


interface IHeaderFeedItem {
    match: IMatch
    index: number
}

const HeaderFeedItem: FC<IHeaderFeedItem> = ({match, index}) => {
    const {token} = theme.useToken()

    const styles: CSSProperties = {
        width: 350,
        // paddingBottom: 15,
        marginRight: 20,
        marginLeft: 20,
        background: token.colorBgLayout
    }

    if (!match.meta.winner) return null

    return (
        // <div style={styles}>
        //     <Row justify="center" style={{width: "100%"}}>Daily</Row>
        //     <Row style={{width: "100%"}}>Daily</Row>
        //     <Row style={{width: "100%"}}>Daily</Row>
        //     <Row style={{width: "100%"}}>Daily</Row>
        // </div>

        <Card size="small" bordered={false} style={styles}>
            {/*<p>Card content Card content Card content Card content</p>*/}
            <Divider style={{width: 300, margin: 0}} orientation="right">{"Winner"}</Divider>
            <Meta
                avatar={<Avatar src={match.meta.winner?.avatar}/>}
                title={
                    <>
                        <Row>{match.meta.winner.nickname}</Row>
                        <Row style={{fontSize: 9}}>{match.id}</Row>
                    </>
                }
                description={
                    <Row justify={"space-between"}>
                        <Col style={{fontSize: 13}}>Reward: {match.reward.coin}</Col>
                        <Col style={{fontSize: 12}}>{format(match.date.start, "dd.MM.yyyy HH:mm")}</Col>

                    </Row>
                }
            />
        </Card>
    )
}


const HeaderFeed = () => {
    const {token} = theme.useToken()
    const feedRef = useRef<HTMLDivElement>(null)
    const [feed, setFeed] = useState<IMatch[]>([])
    const tournamentService = MatchService()

    const styles: CSSProperties = {
        display: "flex",
        overflowX: "auto",
        width: "max-content",
        maxWidth: "100",
        whiteSpace: "nowrap",
        height: 170,
        paddingTop: "20px",
        paddingBottom: "20px",
        // marginBottom: 15,
        borderBottom: "0.4px solid",
        borderBottomColor: token.colorBorder,
        background: token.colorBgLayout,
    }

    useEffect(() => {
        setFeed(() => tournamentService.history)
        console.log("History:", tournamentService.history)
    }, [tournamentService.history])


    const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
        e.stopPropagation() // Handy if you want to prevent event bubbling to scrollable parent
        const scrollLeftPosition = e.currentTarget.scrollLeft

        console.log(scrollLeftPosition)
        // e.currentTarget.scrollTo({left: scrollLeftPosition + 1})
    };


    return (

        <div
            onScroll={handleScroll}
            ref={feedRef}
            style={styles}
        >
            <ConfigProvider
                theme={{token: {colorBgLayout: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,99,121,0) 0%, rgba(0,212,255,0.2) 100%)"}}}>
                {feed.map((tournament, index) => <HeaderFeedItem match={tournament} index={index} key={index}/>)}
            </ConfigProvider>
        </div>

    )
}

export {HeaderFeed}