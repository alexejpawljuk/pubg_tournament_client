import {DatePicker, DatePickerProps} from "antd"
import {MatchControlItemWrap} from "../MatchControlItemWrap"
import React, {FC} from "react"

interface IMatchSortByData {
    props: DatePickerProps
}

const MatchSortByData: FC<IMatchSortByData> = ({props}) => {
    return (
        <MatchControlItemWrap>
            <DatePicker
                size="small"
                style={{width: 231}}
                placeholder="Select date"
                {...props}
            />
        </MatchControlItemWrap>
    );
};

export default MatchSortByData