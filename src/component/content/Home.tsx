import React, {CSSProperties} from 'react'
import Match from "../match/Match"
import {theme} from "antd"

const Home = () => {
    const {token} = theme.useToken()


    const styles: CSSProperties = {
        // borderTop: "0.3px solid",
        // borderTopColor: token.colorBorder,
        background: token.colorBgLayout,
        paddingTop: 20,
    }

    return (

        <div style={styles}>
            <Match/>
        </div>

    )
}

export default Home