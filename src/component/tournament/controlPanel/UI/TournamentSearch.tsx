import React, {CSSProperties, FC} from "react"
import {TournamentControlItemWrap} from "../TournamentControlItemWrap"
import Search from "antd/es/input/Search"
import {SearchProps} from "antd/lib/input"


interface ITournamentSearch {
    props: SearchProps
}

const TournamentSearch: FC<ITournamentSearch> = ({props}) => {
    const styles: CSSProperties = {
        width: 230
    }

    return (
        <TournamentControlItemWrap>
            <Search
                placeholder="Tournament search by ID:"
                size="small"
                style={styles}
                enterButton
                {...props}
            />
        </TournamentControlItemWrap>
    )
}

export {TournamentSearch}