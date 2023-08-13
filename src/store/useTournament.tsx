import {create} from "zustand"
import {ITournament} from "../component/tournament/Tournament"
import list from "../DATA/tournamentData"
import {IFilterOptions} from "../component/tournament/controlPanel/TournamentControlPanel"


interface UseTournament {
    readonly dataSource: ITournament[]
    tournamentList: ITournament[]

    tournamentFetch(): Promise<void>

    tournamentUpdate(tournament: ITournament): Promise<void>

    tournamentFilterByNameAndType(options: IFilterOptions): void

    tournamentSearch(value: string): void

    getOriginTournamentList(): ITournament[]
}


export const useTournament = create<UseTournament>((setState, getState) => ({
    dataSource: [],
    tournamentList: [],

    /**
     * Request tournament list from server
     */
    async tournamentFetch() {
        const tournaments = await list
        setState(state => ({
            ...state,
            dataSource: tournaments,
            tournamentList: tournaments
        }))
    },

    async tournamentUpdate(tournament: ITournament) {

    },

    /**
     * Filter tournament list by tournament name and tournament type then return new array
     * @param options
     */
    tournamentFilterByNameAndType(options) {
        const {name, type} = options
        const filteredTournaments = [...getState().dataSource]
            .filter(tournament => {
                if (name !== "all" && type !== "all")
                    return tournament.name === name && tournament.type === type
                else if (name === "all" && type !== "all")
                    return tournament.type === type
                else if (name !== "all" && type === "all")
                    return tournament.name === name
                else
                    return true
            })
        setState(state => ({
            ...state,
            tournamentList: filteredTournaments,
        }))
    },

    /**
     * Filter tournament list by tournament id then return new array
     * @param value
     */
    tournamentSearch(value) {
        const searchedTournaments = [...getState().dataSource]
            .filter(tournament => tournament.id.includes(value))
        setState(state => ({
            ...state,
            tournamentList: searchedTournaments
        }))
    },

    /**
     * The method return origin tournament list
     * Return a new array
     */
    getOriginTournamentList(): ITournament[] {
        return [...getState().dataSource]
    }
}))