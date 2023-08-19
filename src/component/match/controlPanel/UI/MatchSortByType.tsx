import {Radio, RadioGroupProps} from "antd"
import React, {FC} from "react"
import {MatchControlItemWrap} from "../MatchControlItemWrap"

interface IMatchSortByType {
    props: RadioGroupProps
}


const MatchSortByType: FC<IMatchSortByType> = ({props}) => {
    return (
        <MatchControlItemWrap>
            <Radio.Group
                defaultValue="all"
                size="small"
                name="tournament_type"
                {...props}
            >
                <Radio.Button value="all">all</Radio.Button>
                <Radio.Button value="solo">solo</Radio.Button>
                <Radio.Button value="duo">duo</Radio.Button>
                <Radio.Button value="squad">squad</Radio.Button>
            </Radio.Group>
        </MatchControlItemWrap>
    )
}

export {MatchSortByType}