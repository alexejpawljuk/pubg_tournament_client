import React, {useEffect, useState, useTransition} from 'react'
import TournamentControlPanel from "./TournamentControlPanel"
import {useTournament} from "../../store/useTournament"
import TournamentScrollingList from "./TournamentScrollingList"
import TournamentCreate from "./TournamentCreate";

export type ITournamentNameType = "daily" | "custom" | "sponsorship"
export type ITournamentType = "solo" | "duo" | "squad"

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
}

const Tournament = () => {
    const {tournamentList, tournamentFetch} = useTournament()
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        startTransition(() => {
            tournamentFetch().catch(console.log)
        })


        setTimeout(() => {
            setOpen(() => true)
        }, 2000)
    }, [])

    return (
        <div>
            <TournamentControlPanel
                transition={{isPending, startTransition}}
            />
            <TournamentScrollingList
                tournamentList={tournamentList}
                transition={{isPending, startTransition}}
            />
        </div>
    );
};

export default Tournament