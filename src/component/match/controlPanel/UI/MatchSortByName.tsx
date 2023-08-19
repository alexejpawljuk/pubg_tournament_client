import React, {FC} from "react"
import {Radio, RadioGroupProps} from "antd"
import {MatchControlItemWrap} from "../MatchControlItemWrap"


interface IMatchSortByName {
    props: RadioGroupProps
}

const MatchSortByName: FC<IMatchSortByName> = ({props}) => {

    return (
        <MatchControlItemWrap>
            <Radio.Group
                defaultValue="all"
                size="small"
                name="tournament_name"
                {...props}
            >
                <Radio.Button className={"custom_button"} value="all">all</Radio.Button>
                <Radio.Button value="daily">daily</Radio.Button>
                <Radio.Button value="custom">custom</Radio.Button>
                <Radio.Button value="sponsorship">sponsorship</Radio.Button>
            </Radio.Group>
        </MatchControlItemWrap>
    )
}

export {MatchSortByName}