import React, {CSSProperties} from 'react'
import Match from "../match/Match"
import {theme} from "antd"
import {HeaderFeed} from "../header/HeaderFeed"

const Home = () => {
    const {token} = theme.useToken()

    const styles: CSSProperties = {
        padding: "20px 0 0",
        background: token.colorBgContainer,
    }

    return (

        <div style={styles}>
            <HeaderFeed/>
            <Match/>
        </div>

    )
}

export default Home