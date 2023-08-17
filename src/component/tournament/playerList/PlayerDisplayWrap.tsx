import React, {FC, ReactNode} from 'react'
import {Col} from "antd"

interface IPlayerDisplayWrap {
    children: ReactNode
}

const PlayerDisplayWrap: FC<IPlayerDisplayWrap> = ({children}) => {
    return (
        <Col>
            {children}
        </Col>
    );
};

export {PlayerDisplayWrap}