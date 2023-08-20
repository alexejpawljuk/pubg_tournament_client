import React, {CSSProperties} from 'react'
import Match from "../match/Match"
import {Row, theme} from "antd"
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

            <Row align="middle" className="match_active_gradient" style={{width: "100%", height: 350}}>
                <Row style={{width: "100%", height: "90%"}}>

                </Row>
            </Row>
        </div>

    )
}

export default Home