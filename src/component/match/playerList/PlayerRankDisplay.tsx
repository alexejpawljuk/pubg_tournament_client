import React, {FC} from "react"
import {Rate} from "antd"
import {StarFilled} from "@ant-design/icons"


interface IPlayerRank {
    rank: number
}

const PlayerRankDisplay: FC<IPlayerRank> = ({rank}) => {
    return (
        <Rate
            disabled tooltips={["dad"]}
            count={5}
            value={rank}
            character={<StarFilled style={{width: "0.3em"}}/>}
        />
    )
}

export {PlayerRankDisplay}