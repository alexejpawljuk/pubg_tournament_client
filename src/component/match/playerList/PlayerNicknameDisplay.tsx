import React, {FC} from 'react'
import {Row} from "antd"

interface IPlayerNicknameDisplay {
    nickname: string
    fontSize: number
}

const PlayerNicknameDisplay: FC<IPlayerNicknameDisplay> = ({nickname, fontSize}) => {

    return (
        <Row style={{fontSize: fontSize + 1}}>
            {nickname}
        </Row>
    );
};

export {PlayerNicknameDisplay}