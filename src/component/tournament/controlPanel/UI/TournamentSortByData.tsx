import {DatePicker, DatePickerProps} from "antd"
import {TournamentControlItemWrap} from "../TournamentControlItemWrap"
import React, {FC} from "react"

interface ITournamentSortByData {
    props: DatePickerProps
}

const TournamentSortByData: FC<ITournamentSortByData> = ({props}) => {
    return (
        <TournamentControlItemWrap>
            <DatePicker
                size="small"
                style={{width: 231}}
                placeholder="Select date"
                {...props}
            />
        </TournamentControlItemWrap>
    );
};

export default TournamentSortByData