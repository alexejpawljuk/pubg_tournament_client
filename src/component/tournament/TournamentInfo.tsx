import React, {FC} from "react"
import {Space} from "antd";

import {ITournament} from "./TournamentList"


interface ITournamentInfo {
    tournamentItem: ITournament
}
const TournamentInfo: FC<ITournamentInfo> = ({tournamentItem}) => {
    const {
        name,
        type,
        id,
        members,
        reward,
        price,
        date,
        condition,
    } = tournamentItem

    return (
        <Space
            wrap
            size={[0, 10]}
        >
            <Space>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi distinctio iusto, laudantium libero
                possimus reiciendis rem veritatis. Ab asperiores aspernatur, at delectus deleniti dignissimos dolor
                dolore doloribus error, esse facilis harum illo impedit labore laboriosam maxime modi nesciunt numquam
                optio perferendis porro possimus praesentium quaerat quam quasi qui quia quibusdam, repellendus sit
                tempora tempore temporibus totam unde velit veritatis voluptates voluptatibus. Ab ad, distinctio,
                doloribus expedita libero minima minus obcaecati perspiciatis quidem repellat similique sunt ullam
                voluptatibus? Alias corporis cumque, deleniti doloribus dolorum ea fugiat hic illo in iste iure magnam
                magni neque nostrum quas quidem rem unde velit veritatis?
            </Space>
            <Space>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi distinctio iusto, laudantium libero
                possimus reiciendis rem veritatis. Ab asperiores aspernatur, at delectus deleniti dignissimos dolor
                dolore doloribus error, esse facilis harum illo impedit labore laboriosam maxime modi nesciunt numquam
                optio perferendis porro possimus praesentium quaerat quam quasi qui quia quibusdam, repellendus sit
                tempora tempore temporibus totam unde velit veritatis voluptates voluptatibus. Ab ad, distinctio,
                doloribus expedita libero minima minus obcaecati perspiciatis quidem repellat similique sunt ullam
                voluptatibus? Alias corporis cumque, deleniti doloribus dolorum ea fugiat hic illo in iste iure magnam
                magni neque nostrum quas quidem rem unde velit veritatis?
            </Space>
            <Space>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi distinctio iusto, laudantium libero
                possimus reiciendis rem veritatis. Ab asperiores aspernatur, at delectus deleniti dignissimos dolor
                dolore doloribus error, esse facilis harum illo impedit labore laboriosam maxime modi nesciunt numquam
                optio perferendis porro possimus praesentium quaerat quam quasi qui quia quibusdam, repellendus sit
                tempora tempore temporibus totam unde velit veritatis voluptates voluptatibus. Ab ad, distinctio,
                doloribus expedita libero minima minus obcaecati perspiciatis quidem repellat similique sunt ullam
                voluptatibus? Alias corporis cumque, deleniti doloribus dolorum ea fugiat hic illo in iste iure magnam
                magni neque nostrum quas quidem rem unde velit veritatis?
            </Space>
        </Space>
    )
}

export default TournamentInfo