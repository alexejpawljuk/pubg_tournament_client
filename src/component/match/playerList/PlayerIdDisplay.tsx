import React, {FC} from 'react'
import {Row} from "antd"

interface IPlayerIdDisplay {
    id: string
    fontSize: number
}

const PlayerIdDisplay: FC<IPlayerIdDisplay> = ({id, fontSize}) => {
    return (
        <Row style={{fontSize}}>
            {id}
        </Row>
    );
};

export {PlayerIdDisplay}