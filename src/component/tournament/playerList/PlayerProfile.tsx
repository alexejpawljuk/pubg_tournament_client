import React, {CSSProperties, FC} from 'react'
import ProfileCard from "../../profile/card/ProfileCard"
import {IPlayer} from "../Tournament"
import {Row, theme} from "antd"


interface IPlayerProfile {
    player: IPlayer
}

const PlayerProfile: FC<IPlayerProfile> = ({player}) => {
    const {token} = theme.useToken()

    const styles: CSSProperties = {
        background: token.colorBgBase,
        borderRadius: token.borderRadius,
        padding: "15px",
    }

    return (
        <Row justify="space-evenly" style={styles}>
            <ProfileCard player={player}/>
        </Row>
    );
};

export {PlayerProfile}