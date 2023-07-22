import React, {useMemo} from 'react'
import {Button, Rate, Space, Table, Tag} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import {uid} from "uid"
import {isToday, format, isTomorrow} from "date-fns"
import {LiteralUnion} from "antd/es/_util/type";
import {PresetColorType, PresetStatusColorType} from "antd/es/_util/colors";

type TournamentType = "SOLO" | "DUO" | "SQUAD" | "DAILY" | "CUSTOM"

const getRandomNumber = (factor: number): number => Math.floor(Math.random() * factor)
const getRandomTournamentType = (): TournamentType => {
    const tournaments: TournamentType[] = ["SOLO", "DUO", "SQUAD", "DAILY", "CUSTOM"]
    return tournaments[getRandomNumber(tournaments.length)]
}

interface ITournament {
    key?: string
    id: string
    name: TournamentType
    members: {
        max: number
        alreadyRegistered: number
    }
    reward: {
        token: number
        coin: number
    }
    date: Date
    price: {
        ticket: number
        coin: number
    }
    condition: {
        rating: number
    }
}

const tournamentModel: ColumnsType<ITournament> = [
    {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        align: "center",
        sorter: (a, b, sortOrder) => a.name.localeCompare(b.name),
    },
    {
        key: "date",
        title: "Date",
        dataIndex: "date",
        align: "center",
        width: 150,
        sorter: (a, b, sortOrder) => a.date.getTime() - b.date.getTime(),
        render: (value, record) => {
            let color: LiteralUnion<PresetColorType | PresetStatusColorType> = "default"
            if (isToday(value)) color = "green"
            if (isTomorrow(value)) color = "warning"
            return <Tag color={color}>{format(record.date, "dd.MM.yyyy hh:MM")}</Tag>
        }
    },
    {
        key: "reward",
        title: "Reward",
        dataIndex: "reward",
        align: "center",
        render: (value, record) =>
            <Space direction={"vertical"}>
                <div>Token: {record.reward.token}</div>
                <div>Coin: {record.reward.coin}</div>
            </Space>
    },
    {
        key: "rating",
        title: "Rating",
        dataIndex: "rating",
        align: "center",
        sorter: (a, b) => a.condition.rating - b.condition.rating,
        render: (value, record) => <Rate allowHalf count={3} value={record.condition.rating}></Rate>,
    },
    {
        key: 'members',
        title: 'Members',
        dataIndex: 'members',
        align: "center",
        sorter: (a, b) => a.members.alreadyRegistered - b.members.alreadyRegistered,
        render: (value, record) =>
            <Space>
                {record.members.alreadyRegistered} / {record.members.max}
            </Space>
    },
    {
        key: "price",
        title: "Price",
        dataIndex: "price",
        align: "center",
        render: (value, record) =>
            <Space direction={"vertical"}>
                <span>Ticket: {record.price.ticket}</span>
                <span>Coin: {record.price.coin}</span>
            </Space>
    },
    {
        key: "action",
        title: "Action",
        dataIndex: "action",
        align: "center",
        render: (value, record) => {
            const onJoin = () => {
                console.log(record)
            }

            return (
                <div>
                    <Button size={"small"} onClick={onJoin}>JOIN</Button>
                </div>
            )
        }
    }
]


const ListTournament: React.FC = () => {
    const tournamentList: ITournament[] = [
        {
            id: uid(),
            name: getRandomTournamentType(),
            members: {
                max: 100,
                alreadyRegistered: getRandomNumber(100)
            },
            reward: {
                token: getRandomNumber(20),
                coin: getRandomNumber(20)
            },
            price: {
                ticket: getRandomNumber(20),
                coin: getRandomNumber(20)
            },
            date: new Date(),
            condition: {
                rating: getRandomNumber(3)
            },
        }
    ]


    for (let i = 0; i < 50; i++) {
        tournamentList.push({
            id: uid(),
            name: getRandomTournamentType(),
            members: {
                max: 100,
                alreadyRegistered: getRandomNumber(100)
            },
            reward: {
                token: getRandomNumber(20),
                coin: getRandomNumber(20)
            },
            price: {
                ticket: getRandomNumber(20),
                coin: getRandomNumber(20)
            },
            date: new Date(2023, 6, getRandomNumber(28)),
            condition: {
                rating: getRandomNumber(3)
            },
        })
    }

    const sortedByDateTournamentList = useMemo(() => {
        return tournamentList.sort((a, b) => a.date.getTime() - b.date.getTime())
    }, [tournamentList])


    return (
        <div>
            <Table
                className="virtual-table"
                columns={tournamentModel}
                pagination={false}
                dataSource={
                    sortedByDateTournamentList.filter(tournament => tournament.date.getTime() >= new Date().getTime())
                }
                rowKey={record => record.key = uid()}
                scroll={{y: 300, x: "100vh"}}
                size={"small"}

            />
        </div>
    )
}

export default ListTournament