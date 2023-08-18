import React, {CSSProperties, FC, ReactNode, useEffect, useRef, useState} from 'react'
import {Avatar, Card, Col, ConfigProvider, Divider, theme} from "antd"
import tournament, {ITournament} from "../tournament/Tournament";
import {TournamentService} from "../../service/TournamentService";
import Meta from "antd/es/card/Meta";


interface IHeaderFeedItem {
    tournament: ITournament
    index: number
}

const HeaderFeedItem: FC<IHeaderFeedItem> = ({tournament, index}) => {
    const {token} = theme.useToken()

    const styles: CSSProperties = {
        width: 350,
        // paddingBottom: 15,
        marginRight: 20,
        marginLeft: 20,
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
            <Divider style={{width: 300, margin: 0}} orientation="right">{tournament.type.toUpperCase()}</Divider>
            <Meta
                avatar={<Avatar src={tournament.meta.players[0].avatar} />}
                title={tournament.meta.players[0].nickname}
                description={tournament.meta.players[0].id}
            />
            {/*<Col>*/}
            {/*    <Avatar src={tournament.meta.players[1].avatar}/>*/}
            {/*</Col>*/}
            {/*<Col>*/}
            {/*    <p>Card content</p>*/}
            {/*</Col>*/}

        </Card>
    )
}


const HeaderFeed = () => {
    const {token} = theme.useToken()
    const feedRef = useRef<HTMLDivElement>(null)
    const [feed, setFeed] = useState<ITournament[]>([])
    const tournamentService = TournamentService()

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
        setFeed(() => tournamentService.tournamentList)
    }, [tournamentService.tournamentList])


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
            ref={feedRef}
            style={styles}
        >
            <ConfigProvider
                theme={{token: {colorBgLayout: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,99,121,0) 0%, rgba(0,212,255,0.2) 100%)"}}}>
                {feed.map((tournament, index) => <HeaderFeedItem tournament={tournament} index={index} key={index}/>)}
            </ConfigProvider>
        </div>

    )
}

export {HeaderFeed}