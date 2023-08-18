import React, { FC} from "react"
import {Radio, RadioGroupProps} from "antd"
import {TournamentControlItemWrap} from "../TournamentControlItemWrap"


interface ITournamentSortByName {
    props: RadioGroupProps
}

const TournamentSortByName: FC<ITournamentSortByName> = ({props}) => {
    return (
        <TournamentControlItemWrap>
            <Radio.Group
                defaultValue="all"
                size="small"
                name="tournament_name"
                {...props}
            >
                <Radio.Button className="control_panel_button" value="all">all</Radio.Button>
                <Radio.Button value="daily">daily</Radio.Button>
                <Radio.Button value="custom">custom</Radio.Button>
                <Radio.Button value="sponsorship">sponsorship</Radio.Button>
            </Radio.Group>
        </TournamentControlItemWrap>
    )
}

export {TournamentSortByName}