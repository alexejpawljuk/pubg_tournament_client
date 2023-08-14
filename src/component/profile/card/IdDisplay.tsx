import React, {FC} from 'react'
import {Tag, Tooltip} from "antd"
import {ProfileCardItemWrap} from "./ProfileCardItemWrap"
import Meta from "antd/es/card/Meta"

interface IIdDisplay {
    id: string
}

const IdDisplay: FC<IIdDisplay> = ({id}) => {
    return (
        <ProfileCardItemWrap>
            <Meta title={
                <Tooltip
                    placement="top"
                    title="Your ID"
                >
                    <Tag style={{marginTop: 10}}>ID: {id}</Tag>
                </Tooltip>
            }/>
        </ProfileCardItemWrap>
    );
};

export {IdDisplay}