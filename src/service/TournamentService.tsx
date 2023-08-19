import {create} from "zustand"
import {ITournament} from "../component/tournament/Tournament"
import {list} from "../DATA/tournamentData"
import {IFilterOptions} from "../component/tournament/controlPanel/TournamentControlPanel"


interface ITournamentService {
    readonly dataSource: Readonly<ITournament[]>
    tournamentList: ITournament[]
    history: ITournament[]

    tournamentFetch(): Promise<void>

    tournamentUpdate(tournament: ITournament): Promise<void>

    tournamentFilterByNameAndType(options: IFilterOptions): void

    tournamentSearch(value: string): void

    tournamentToDefault(): void

    getTournamentHistory(): Promise<void>

    getOriginTournamentList(): ITournament[]
}


export const TournamentService = create<ITournamentService>((setState, getState) => ({
    dataSource: [],
    tournamentList: [],
    history: [],

    /**
     * Request tournament list from server
     */
    async tournamentFetch() {
        const {listSortedByDate, historySortedByDate} = await list
        setState(state => ({
            ...state,
            dataSource: listSortedByDate,
            tournamentList: listSortedByDate,
            history: historySortedByDate
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
     * The method get origin tournament list
     */
    tournamentToDefault() {
        setState(state => ({
            ...state,
            tournamentList: this.getOriginTournamentList()
        }))
    },


    /**
     * The method return history of tournaments
     * Return a new array with 100 items
     */
    async getTournamentHistory() {
        const {historySortedByDate} = await list
        // const {listSortedByDate} = await list
        // setState(state => ({
        //     ...state,
        //     dataSource: listSortedByDate,
        //     tournamentList: listSortedByDate
        // }))
    },

    /**
     * The method return origin tournament list
     * Return a new array
     */
    getOriginTournamentList(): ITournament[] {
        return [...getState().dataSource]
    }
}))