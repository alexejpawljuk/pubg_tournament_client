import React, {useEffect, useMemo, useState} from 'react'
import {Button, Progress, Rate, Space, Table, Tag, theme} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import {uid} from "uid"
import {isToday, format, isTomorrow, isAfter} from "date-fns"
import {LiteralUnion} from "antd/es/_util/type"
import {PresetColorType, PresetStatusColorType} from "antd/es/_util/colors"
import ModalPopup from "./ModalPopup"
import {LoginOutlined} from "@ant-design/icons"

type TournamentName = "DAILY" | "CUSTOM"
type TournamentType = "SOLO" | "DUO" | "SQUAD"

const getRandomNumber = (factor: number): number => Math.floor(Math.random() * factor)
const getRandomTournamentType = (): TournamentType => {
    const tournamentTypes: TournamentType[] = ["SOLO", "DUO", "SQUAD"]
    return tournamentTypes[getRandomNumber(tournamentTypes.length)]
}

const getRandomTournamentName = (): TournamentName => {
    const tournamentNames: TournamentName[] = ["DAILY", "CUSTOM"]
    return tournamentNames[getRandomNumber(tournamentNames.length)]
}

interface ITournament {
    key?: string
    id: string
    name: TournamentName
    type: TournamentType
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
        rank: number // 0.00 - 3.00
    }
}

const tournamentModel: ColumnsType<ITournament> = [
    {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        align: "center",
        width: 120,
        sorter: (a, b, sortOrder) => a.name.localeCompare(b.name),
    },
    {
        key: 'type',
        title: 'Type',
        dataIndex: 'type',
        align: "center",
        width: 120,
        sorter: (a, b, sortOrder) => a.type.localeCompare(b.type),
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
        width: 150,
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
        key: "rank",
        title: "Rank",
        dataIndex: "rank",
        align: "center",
        width: 150,
        sorter: (a, b) => a.condition.rank - b.condition.rank,
        render: (value, record) =>
            <Rate
                disabled
                allowHalf
                count={5}
                value={record.condition.rank}
            />,
    },
    {
        key: 'members',
        title: 'Members',
        dataIndex: 'members',
        align: "center",
        width: 150,
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
        width: 200,
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
        width: 200,
        render: (value, record) =>
            <Space direction={"vertical"}>
                <Button
                    size="small"
                    // color={"#55acee"}
                    icon={<LoginOutlined/>}
                    onClick={e => {
                        e.stopPropagation()
                        console.log("Click on JOIN", record)
                    }}
                >
                    JOIN
                </Button>
            </Space>
    }
]


const ListTournament: React.FC = () => {
    const tournamentList: ITournament[] = []
    const sortedByDateTournamentList = useMemo(() => {
        for (let i = 0; i < 150; i++) {
            tournamentList.push({
                id: uid(),
                name: getRandomTournamentName(),
                type: getRandomTournamentType(),
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
                    rank: getRandomNumber(5)
                },
            })
        }
        const filteredByDateTournamentList = tournamentList.filter(tournament => isAfter(tournament.date, new Date()) || isToday(tournament.date))
        const sorteredByDate = filteredByDateTournamentList.sort((a, b) => a.date.getTime() - b.date.getTime())
        return sorteredByDate
    }, [tournamentList])

    const {token: {colorBgContainer, colorTextHeading}} = theme.useToken()

    const [isTableLoading, setIsTableLoading] = useState<boolean>(true)
    const [tableDataSource, setTableDataSource] = useState<ITournament[]>()

    useEffect(() => {
        setTimeout(() => {
            setIsTableLoading(false)
            setTableDataSource(sortedByDateTournamentList)
        }, 2000)
    }, [])


    return (
        <div>
            <Table
                columns={tournamentModel}
                pagination={false}
                dataSource={tableDataSource}
                rowKey={record => record.key = uid()}
                scroll={{y: 300, x: "100vh"}}
                size="small"
                loading={isTableLoading}
                footer={() => <div style={{height: 10}}></div>}
                // tableLayout="auto"
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



// const getRandomFloat = (factor: number): number => +(Math.random() * factor).toFixed(2)
{/*<Progress*/}
{/*    style={{margin: 0}}*/}
{/*    percent={Number((100 * (record.condition.rank % 1)).toFixed(2))}*/}
{/*    size={[150, 5]}*/}
{/*/>*/}