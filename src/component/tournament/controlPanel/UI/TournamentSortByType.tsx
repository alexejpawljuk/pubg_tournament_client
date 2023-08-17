import {Radio, RadioGroupProps} from "antd"
import React, {FC} from "react"
import {TournamentControlItemWrap} from "../TournamentControlItemWrap"

interface ITournamentSortByType {
    props: RadioGroupProps
}


const TournamentSortByType: FC<ITournamentSortByType> = ({props}) => {
    return (
        <TournamentControlItemWrap>
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
        </TournamentControlItemWrap>
    )
}

export {TournamentSortByType}