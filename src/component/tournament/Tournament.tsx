import React, {useEffect, useState, useTransition} from 'react'
import TournamentControlPanel from "./controlPanel/TournamentControlPanel"
import {useTournament} from "../../store/useTournament"
import TournamentList from "./list/TournamentList"
import LoadMoreList from "../ListLoadMore";
import {Avatar, Col, Row, theme} from "antd";
import coinSVG from "../../image/svg/coins.svg";
import {FaPeopleGroup} from "react-icons/fa6";
import ticketSVG from "../../image/svg/ticket.svg";

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
    date: Date
    // date: {
    //     start: Date
    //     end: Date
    // }
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
        // donations: IDonate[]
    }
}

const Tournament = () => {
    const {token} = theme.useToken()

    const {tournamentList, tournamentFetch} = useTournament()
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(() => {
            tournamentFetch().catch(console.log)
        })
    }, [])

    return (
        <div>
            <TournamentControlPanel
                transition={{isPending, startTransition}}
            />
            <TournamentList
                tournamentList={tournamentList}
                transition={{isPending, startTransition}}
            />
        </div>
    );
};

export default Tournament