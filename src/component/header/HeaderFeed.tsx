import React, {CSSProperties, useEffect, useRef, useState, useTransition} from 'react'
import {ConfigProvider, Divider, Row, Spin, theme} from "antd"
import {IMatch} from "../match/Match"
import {MatchService} from "../../service/MatchService"
import {HeaderFeedItem} from "./HeaderFeedItem"

const Loading = () => {
    return (
        <Row justify="center" style={{width: "100%"}}>
            <Spin/>
        </Row>
    )
}

const HeaderFeed = () => {
    const {token} = theme.useToken()
    const [feed, setFeed] = useState<IMatch[]>([])
    const tournamentService = MatchService()
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isPending, startTransition] = useTransition()

    const styles: CSSProperties = {
        display: "flex",
        overflowX: "auto",
        // width: "max-content",
        width: "100%",
        // maxWidth: "100",
        whiteSpace: "nowrap",
        height: 180,
        gap: 40,
        padding: "0 40px",
        alignItems: "center",
        background: token.colorBgLayout,
    }

    useEffect(() => {
        startTransition(() => {
            setFeed(() => tournamentService.history)
            console.log("History:", tournamentService.history)
        })
    }, [tournamentService.history])


    return (
        <Row style={{padding: "5px 0 15px", width: "100%",}}>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgLayout: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,99,121,0) 0%, rgba(0,212,255,0.2) 100%)",
                    }
                }}
            >
                <Row style={{width: "100%"}}>
                    <Divider
                        orientation={"center"}
                        className="last_matches"
                        style={{
                            margin: 0,
                            padding: 0,
                            paddingTop: 15,
                            fontSize: 20,
                            background: token.colorBgLayout
                        }}
                    ><span>{"Last matches".toUpperCase()}</span></Divider>
                </Row>
                <div ref={scrollRef} style={styles}>
                    {
                        isPending ?
                            <Loading/> :
                            feed.map((tournament, index) =>
                                <HeaderFeedItem match={tournament} index={index} key={index}/>)
                    }
                </div>
            </ConfigProvider>
        </Row>
    )
}

export {HeaderFeed}