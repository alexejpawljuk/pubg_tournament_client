import React, {FC, TransitionStartFunction, useEffect, useState} from 'react'
import {ModalPopupService} from "../../service/ModelPopupService"
import {tournamentModel} from "./tableModel"
import {useLogger} from "../../hook/useLogger"
import MatchDetails from "./details/MatchDetails"
import {IMatch} from "./Match"
import {Table} from 'antd'
import {uid} from "uid"


interface IMatchList {
    matchTable: IMatch[]
    transition: {
        startTransition: TransitionStartFunction
        isPending: boolean
    }
}

const MatchTable: FC<IMatchList> = ({matchTable, transition}) => {
    useLogger("TournamentList render")
    const modalPopupService = ModalPopupService()
    const {isPending, startTransition} = transition
    const [list, setList] = useState<IMatch[]>([])

    useEffect(() => {
        startTransition(() => {
            setList(() => matchTable)
        })
    }, [matchTable])

    return (
        <Table
            style={{padding: "10px 5px"}}
            columns={tournamentModel}
            pagination={false}
            dataSource={list}
            rowKey={record => record.key = uid()}
            scroll={{y: 350, x: "100svh"}}
            size="small"
            loading={isPending}
            footer={() => <div style={{height: 5}}></div>}
            onRow={data => ({
                onClick: () => {
                    console.log("Click on row:", data)
                    modalPopupService.setOpenModal(prevState => ({
                        openModal: true,
                        children: <MatchDetails tournament={data}/>,
                        props: {
                            width: 1000,
                        }
                    }))
                }
            })}
        />
    )
}

export default MatchTable