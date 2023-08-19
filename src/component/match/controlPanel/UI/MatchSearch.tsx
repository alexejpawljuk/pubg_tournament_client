import React, {CSSProperties, FC} from "react"
import {MatchControlItemWrap} from "../MatchControlItemWrap"
import Search from "antd/es/input/Search"
import {SearchProps} from "antd/lib/input"


interface IMatchSearch {
    props: SearchProps
}

const MatchSearch: FC<IMatchSearch> = ({props}) => {
    const styles: CSSProperties = {
        width: 230,
    }

    return (
        <MatchControlItemWrap>
            <Search
                placeholder="search match by ID:"
                size="small"
                style={styles}
                enterButton
                {...props}
            />
        </MatchControlItemWrap>
    )
}

export {MatchSearch}