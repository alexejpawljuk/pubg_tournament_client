import React, {useEffect, useMemo, useState} from 'react'
import {Table} from 'antd'
import {uid} from "uid"
import {isToday, isAfter} from "date-fns"
import {useModalPopup} from "../../store/useModelPopup"
import list from "../../DATA/tournamentData"
import {tournamentModel} from "./tableModel"
import {useLogger} from "../../hook/useLogger"
import TournamentInfo from "./TournamentInfo"


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


const TournamentList: React.FC = () => {
    useLogger("TournamentList render")

    const [isTableLoading, setIsTableLoading] = useState<boolean>(false)
    const [tableDataSource, setTableDataSource] = useState<ITournament[]>([])
    const modalPopup = useModalPopup()


    const filteredByDateTournamentList = useMemo(() => {
        return tableDataSource?.filter(tournament => isAfter(tournament.date, new Date()) || isToday(tournament.date))
    }, [tableDataSource])

    const sortedByDateTournamentList = useMemo(() => {
        return filteredByDateTournamentList?.sort((a, b) => a.date.getTime() - b.date.getTime())
    }, [filteredByDateTournamentList])

    // const chunkTableData = useMemo(() => {
    //     const chunkSize = 10
    //     const chunk: ITournament[] = []
    //     let iter = 0
    //     for (let i = 0; i < sortedByDateTournamentList.length; i++) {
    //         if (iter < chunkSize) {
    //             iter++
    //             chunk.push(sortedByDateTournamentList[i])
    //         } else {
    //             iter = 0
    //         }
    //     }
    //
    //     return chunk
    // }, [sortedByDateTournamentList])


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