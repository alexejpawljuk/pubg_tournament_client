import React, {CSSProperties} from 'react'
import Tournament from "../tournament/Tournament"
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
            <Tournament/>
        </div>

    )
}

export default Home