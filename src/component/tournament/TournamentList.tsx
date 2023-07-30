import React, {FC, useEffect, useMemo, useState} from 'react'
import {Space, Table} from 'antd'
import {uid} from "uid"
import {isToday, isAfter} from "date-fns"
import {useModalPopup} from "../../store/useModelPopup"
import list from "../../DATA/tournamentData";
import {tournamentModel} from "./tableModel";
import {useLogger} from "../../hook/useLogger";


export type TournamentNameType = "DAILY" | "CUSTOM" | "SPONSORSHIP"
export type TournamentType = "SOLO" | "DUO" | "SQUAD"

export interface ITournament {
    key?: string
    id: string
    name: TournamentNameType
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
        premium: boolean
    }
}

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

const TournamentList: React.FC = () => {
    useLogger("TournamentList render")
    const [isTableLoading, setIsTableLoading] = useState<boolean>(false)
    const [tableDataSource, setTableDataSource] = useState<ITournament[]>()
    const modalPopup = useModalPopup()


    const filteredByDateTournamentList = useMemo(() => {
        return tableDataSource?.filter(tournament => isAfter(tournament.date, new Date()) || isToday(tournament.date))
    }, [tableDataSource])

    const sortedByDateTournamentList = useMemo(() => {
        return filteredByDateTournamentList?.sort((a, b) => a.date.getTime() - b.date.getTime())
    }, [filteredByDateTournamentList])


    useEffect(() => {
        list.then(data => setTableDataSource(data))
    }, [])


    return (
        <Table
            style={{padding: "10px 5px"}}
            columns={tournamentModel}
            pagination={false}
            dataSource={sortedByDateTournamentList}
            rowKey={record => record.key = uid()}
            scroll={{y: 350, x: "100vh"}}
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