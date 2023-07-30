import React, {FC, useEffect, useMemo, useState} from 'react'
import {Avatar, Button, Rate, Space, Table, Tag, TagProps, theme, Tooltip} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import {uid} from "uid"
import {isToday, format, isTomorrow, isAfter} from "date-fns"
import {LiteralUnion} from "antd/es/_util/type"
import {PresetColorType, PresetStatusColorType} from "antd/es/_util/colors"
import {LoginOutlined, StarFilled} from "@ant-design/icons"
import {useModalPopup} from "../store/useModelPopup"
import coinSVG from "../image/svg/coins.svg"

type TournamentName = "DAILY" | "CUSTOM" | "SPONSORSHIP"
type TournamentType = "SOLO" | "DUO" | "SQUAD"

export interface ITournament {
    key?: string
    id: string
    name: TournamentName
    type: TournamentType
    members: {
        max: number
        alreadyRegistered: number
    }
    reward: {
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

interface ITournamentItem {
    tournamentItem: ITournament
}

interface IDateDisplay {
    props?: TagProps
    date: Date
}

interface IRankDisplay {
    value: number
}

const getRandomNumber = (factor: number): number => Math.floor(Math.random() * factor)
const getRandomTournamentType = (): TournamentType => {
    const tournamentTypes: TournamentType[] = ["SOLO", "DUO", "SQUAD"]
    return tournamentTypes[getRandomNumber(tournamentTypes.length)]
}

const getRandomTournamentName = (): TournamentName => {
    const tournamentNames: TournamentName[] = ["DAILY", "CUSTOM", "SPONSORSHIP"]
    return tournamentNames[getRandomNumber(tournamentNames.length)]
}

const DateDisplay: FC<IDateDisplay> = ({date, props}) => {
    let color: LiteralUnion<PresetColorType | PresetStatusColorType> = "default"
    if (isToday(date)) color = "green"
    if (isTomorrow(date)) color = "warning"
    return <Tag color={color} {...props}>{format(date, "dd.MM.yyyy hh:mm")}</Tag>
}

const JoinGameButton: FC<{ tournament: ITournament }> = ({tournament}) => {
    const {token: {colorBgLayout}} = theme.useToken()

    return <Button
        size="small"
        icon={<LoginOutlined/>}
        style={{background: "orange", color: colorBgLayout}}
        type="default"
        onClick={e => {
            e.stopPropagation()
            console.log("Click on JOIN", tournament)
        }}
    >
        JOIN
    </Button>
}

const RankDisplay: FC<IRankDisplay> = ({value}) => {
    return (

        <Rate
            disabled
            allowHalf
            count={5}
            value={value}
            character={
                <Tooltip placement="top"
                         title="To participate in the tournament, you must have the corresponding rank or higher."
                >
                    <StarFilled style={{width: "0.6em"}}/>
                </Tooltip>
            }
        />
    )
}

const TournamentInfo: FC<ITournamentItem> = ({tournamentItem}) => {
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

const TournamentList: React.FC = () => {
    // const {token: {colorBgLayout}} = theme.useToken()
    const [isTableLoading, setIsTableLoading] = useState<boolean>(false)
    const [tableDataSource, setTableDataSource] = useState<ITournament[]>()
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const modalPopup = useModalPopup()

    const fontSize = 12

    const tournamentModel: ColumnsType<ITournament> = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            align: "center",
            width: 110,
            sorter: (a, b, sortOrder) => a.name.localeCompare(b.name),
            render: (value, record) => <span style={{fontSize}}>{record.name}</span>
        },
        {
            key: 'type',
            title: 'Type',
            dataIndex: 'type',
            align: "center",
            width: 70,
            sorter: (a, b, sortOrder) => a.type.localeCompare(b.type),
            render: (value, record) => <span style={{fontSize}}>{record.type}</span>
        },
        {
            key: "date",
            title: "Date",
            dataIndex: "date",
            align: "center",
            width: 130,
            sorter: (a, b, sortOrder) => a.date.getTime() - b.date.getTime(),
            render: (value, record) => <DateDisplay date={record.date} props={{style: {fontSize}}}/>
        },
        {
            key: "reward",
            title: "Reward",
            dataIndex: "reward",
            align: "center",
            width: 85,
            sorter: (a, b) => a.reward.coin - b.reward.coin,
            render: (value, record) =>
                <Tooltip placement="top"
                         title="For the victory in the tournament, the winner will receive coins as a reward.">
                    <Avatar size={20} src={coinSVG} alt={"coin"}/>
                    <div style={{fontSize}}>{record.reward.coin}</div>
                </Tooltip>
        },
        {
            key: "rank",
            title: "Rank",
            dataIndex: "rank",
            align: "center",
            width: 115,
            sorter: (a, b) => a.condition.rank - b.condition.rank,
            render: (value, record) =>
                <RankDisplay value={record.condition.rank}/>,
        },
        {
            key: 'members',
            title: 'Members',
            dataIndex: 'members',
            align: "center",
            width: 90,
            sorter: (a, b) => a.members.alreadyRegistered - b.members.alreadyRegistered,
            render: (value, record) =>
                <span style={{fontSize}}>
                    {record.members.alreadyRegistered} / {record.members.max}
                </span>
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
            render: (value, record) => <JoinGameButton tournament={record}/>
        }
    ]

    const tournamentList: ITournament[] = []
    const sortedByDateTournamentList = useMemo(() => {
        for (let i = 0; i < 200; i++) {
            tournamentList.push({
                id: i.toString(),
                name: getRandomTournamentName(),
                type: getRandomTournamentType(),
                members: {
                    max: 100,
                    alreadyRegistered: getRandomNumber(100)
                },
                reward: {
                    coin: getRandomNumber(1000)
                },
                price: {
                    ticket: getRandomNumber(20),
                    coin: getRandomNumber(20)
                },
                date: new Date(2023, 6, getRandomNumber(31), getRandomNumber(24), getRandomNumber(60)),
                condition: {
                    rank: getRandomNumber(5)
                },
            })
        }
        const filteredByDateTournamentList = tournamentList.filter(tournament => isAfter(tournament.date, new Date()) || isToday(tournament.date))
        const sorteredByDate = filteredByDateTournamentList.sort((a, b) => a.date.getTime() - b.date.getTime())
        return sorteredByDate
    }, [])


    useEffect(() => {
        setTableDataSource(sortedByDateTournamentList)
    }, [])

    return (
        <Table
            style={{padding: "10px 5px"}}
            columns={tournamentModel}
            pagination={false}
            dataSource={tableDataSource}
            rowKey={record => record.key = uid()}
            scroll={{y: 300, x: "100vh"}}
            size="small"
            loading={isTableLoading}
            footer={() => <div style={{height: 5}}></div>}
            onRow={data => ({
                onClick: () => {
                    console.log("Click on row:", data)
                    modalPopup.setOpenModal(prevState => ({
                        openModal: true,
                        children: <TournamentInfo tournamentItem={data}/>,
                        props: {width: 1000}
                    }))
                }
            })}
        />
    )
}

export default TournamentList