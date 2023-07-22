import React, {useMemo} from 'react'
import {Button, Rate, Space, Table, Tag, theme} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import {uid} from "uid"
import {isToday, format, isTomorrow, isAfter} from "date-fns"
import {LiteralUnion} from "antd/es/_util/type"
import {PresetColorType, PresetStatusColorType} from "antd/es/_util/colors"
import ModalPopup from "./ModalPopup"
import {LoginOutlined} from "@ant-design/icons"

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
        sorter: (a, b) => {
            if (a.reward.token === b.reward.token) return a.reward.coin - b.reward.coin
            else return a.reward.token - b.reward.token
        },
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
        render: (value, record) => <Rate disabled allowHalf count={3} value={record.condition.rating}></Rate>,
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
        sorter: (a, b) => {
            if (a.price.ticket === b.price.ticket) return a.price.coin - b.price.coin
            else return a.price.ticket - b.price.ticket
        },
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
        render: (value, record) =>
            <Space>
                <Button
                    size="small"
                    icon={<LoginOutlined/>}
                    onClick={e => {
                        e.stopPropagation()
                    }}
                >
                    JOIN
                </Button>
            </Space>
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
            date: new Date(2023, 6, 22),
            condition: {
                rating: getRandomNumber(3)
            },
        }
    ]


    const sortedByDateTournamentList = useMemo(() => {
        for (let i = 0; i < 150; i++) {
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
        const filteredByDateTournamentList = tournamentList.filter(tournament => isAfter(tournament.date, new Date()) || isToday(tournament.date))
        return filteredByDateTournamentList.sort((a, b) => a.date.getTime() - b.date.getTime())
    }, [tournamentList])

    const {token: {colorBgContainer, colorTextHeading}} = theme.useToken()

    return (
        <div>
            <Table
                columns={tournamentModel}
                pagination={false}
                dataSource={sortedByDateTournamentList}
                rowKey={record => record.key = uid()}
                scroll={{y: 300, x: "100vh"}}
                size="small"
                footer={() => <div style={{height: 10}}></div>}
                tableLayout="auto"
                onRow={data => ({
                    onClick: () => {
                        console.log("Click on row:", data)
                    }
                })}
            />
        </div>
    )
}

export default ListTournament