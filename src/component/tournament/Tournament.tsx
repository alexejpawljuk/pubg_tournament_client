import React, {CSSProperties, useEffect, useTransition} from 'react'
import TournamentControlPanel from "./controlPanel/TournamentControlPanel"
import {TournamentService} from "../../service/TournamentService"
import TournamentList from "./list/TournamentList"
import {ConfigProvider, theme} from "antd";


export type ITournamentNameType = "daily" | "custom" | "sponsorship"
export type ITournamentType = "solo" | "duo" | "squad"


export interface IDonate {
    player: IPlayer
    from: IPlayer
    amount: string
    date: Date
    tournament: ITournament
}

export interface IPlayer {
    id: string
    nickname: string
    rank: number
    avatar: string
    premium: boolean
    teamId: string | null
    experience: number
}

export interface ITournament {
    key?: string
    id: string
    name: ITournamentNameType
    type: ITournamentType
    members: {
        max: number
        alreadyRegistered: number
    }
    reward: {
        coin: number
    }
    // date: Date
    date: {
        start: Date
        end: Date | null
    }

    price: {
        ticket: number
        coin: number

    }
    donation: number
    condition: {
        rank: number // 0.00 - 3.00
        premium: boolean
    }
    meta: {
        players: IPlayer[]
        winner: IPlayer | null
        // donations: IDonate[]
    }
}

const Tournament = () => {
    const {token} = theme.useToken()
    const {tournamentList, tournamentFetch} = TournamentService()
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(() => {
            tournamentFetch().catch(console.log)
        })
    }, [])


    return (
        <div style={{
            background: token.colorBgLayout
        }}>
            <TournamentControlPanel
                transition={{isPending, startTransition}}
            />
            <TournamentList
                tournamentList={tournamentList}
                transition={{isPending, startTransition}}
            />
        </div>
    )
}

export default Tournament