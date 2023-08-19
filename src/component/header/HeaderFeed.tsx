import React, {CSSProperties, useEffect, useRef, useState} from 'react'
import {ConfigProvider, theme} from "antd"
import {IMatch} from "../match/Match"
import {MatchService} from "../../service/MatchService"
import {HeaderFeedItem} from "./HeaderFeedItem"


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
        gap: 40,
        padding: "0px 40px",
        alignItems: "center",
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