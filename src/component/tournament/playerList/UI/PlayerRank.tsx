import React, {FC} from "react"
import {Rate} from "antd"
import {StarFilled} from "@ant-design/icons"


interface IPlayerRank {
    rank: number
}

const PlayerRank: FC<IPlayerRank> = ({rank}) => {
    return (
        <Rate
            disabled tooltips={["dad"]}
            allowHalf
            count={5}
            value={rank}
            character={<StarFilled style={{width: "0.3em"}}/>}
        />
    )
}

export {PlayerRank}