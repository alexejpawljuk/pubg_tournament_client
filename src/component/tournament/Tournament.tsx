import React, {useEffect, useState, useTransition} from 'react'
import TournamentControlPanel from "./controlPanel/TournamentControlPanel"
import {useTournament} from "../../store/useTournament"
import TournamentList from "./TournamentList"
import LoadMoreList from "../ListLoadMore";
import {Avatar, Col, Row, theme} from "antd";
import coinSVG from "../../image/svg/coins.svg";
import {FaPeopleGroup} from "react-icons/fa6";
import ticketSVG from "../../image/svg/ticket.svg";

export type ITournamentNameType = "daily" | "custom" | "sponsorship"
export type ITournamentType = "solo" | "duo" | "squad"

export interface IPlayer {
    id: string
    nickname: string
    rank: number
    avatar: string
    premium: boolean
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
    price: {
        ticket: number
        coin: number

    }
    condition: {
        rank: number // 0.00 - 3.00
        premium: boolean
    }
    meta: {
        players: IPlayer[]
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