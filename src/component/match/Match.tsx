import MatchControlPanel from "./controlPanel/MatchControlPanel"
import {MatchService} from "../../service/MatchService"
import React, {useEffect, useTransition} from 'react'
import MatchList from "./list/MatchList"
import {theme} from "antd"


export type IMatchNameType = "daily" | "custom" | "sponsorship"
export type IMatchType = "solo" | "duo" | "squad"


export interface IDonate {
    player: IPlayer
    from: IPlayer
    amount: string
    date: Date
    match: IMatch
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

export interface IMatch {
    key?: string
    id: string
    name: IMatchNameType
    type: IMatchType
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

const Match = () => {
    const {token} = theme.useToken()
    const {matchList, matchFetch} = MatchService()
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(() => {
            matchFetch().catch(console.log)
        })
    }, [])


    return (
        <div style={{
            background: token.colorBgContainer
        }}>
            <MatchControlPanel
                transition={{isPending, startTransition}}
            />
            <MatchList
                matchList={matchList}
                transition={{isPending, startTransition}}
            />
        </div>
    )
}

export default Match