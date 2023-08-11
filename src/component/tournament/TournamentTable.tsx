import React, {FC, TransitionStartFunction, useEffect, useState} from 'react'
import {Table} from 'antd'
import {uid} from "uid"
import {useModalPopup} from "../../store/useModelPopup"
import {tournamentModel} from "./tableModel"
import {useLogger} from "../../hook/useLogger"
import TournamentDetails from "./details/TournamentDetails"
import {ITournament} from "./Tournament"


interface ITournamentList {
    tournamentList: ITournament[]
    transition: {
        startTransition: TransitionStartFunction
        isPending: boolean
    }
}

const TournamentList: FC<ITournamentList> = ({tournamentList, transition}) => {
    useLogger("TournamentList render")
    const modalPopup = useModalPopup()
    const {isPending, startTransition} = transition
    const [list, setList] = useState<ITournament[]>([])

    useEffect(() => {
        startTransition(() => {
            setList(() => tournamentList)
        })
    }, [tournamentList])

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
                    modalPopup.setOpenModal(prevState => ({
                        openModal: true,
                        children: <TournamentDetails tournament={data}/>,
                        props: {
                            width: 1000,
                        }
                    }))
                }
            })}
        />
    )
}

export default TournamentList