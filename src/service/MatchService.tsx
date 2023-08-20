import {create} from "zustand"
import {IMatch} from "../component/match/Match"
import {list} from "../DATA/matchData"
import {IFilterOptions} from "../component/match/controlPanel/MatchControlPanel"


interface IMatchService {
    readonly matchListDataSource: Readonly<IMatch[]>
    matchList: IMatch[]
    history: IMatch[]

    matchFetch(): Promise<void>

    matchUpdate(match: IMatch): Promise<void>

    matchFilterByNameAndType(options: IFilterOptions): void

    matchSearch(value: string): void

    matchToDefault(): void

    matchHistoryFetch(): Promise<void>

    getOriginMatchList(): IMatch[]
}


export const MatchService = create<IMatchService>((setState, getState) => ({
    matchListDataSource: [],
    matchList: [],
    history: [],

    /**
     * Request match list from server
     */
    async matchFetch() {
        const {listSortedByDate, historySortedByDate} = await list
        setState(state => ({
            ...state,
            matchListDataSource: listSortedByDate,
            matchList: listSortedByDate,
            history: historySortedByDate
        }))
    },

    async matchUpdate(match: IMatch) {

    },

    /**
     * Filter match list by match name and match type then return new array
     * @param options
     */
    matchFilterByNameAndType(options) {
        const {name, type} = options
        const filteredMatches = [...getState().matchListDataSource]
            .filter(match => {
                if (name !== "all" && type !== "all")
                    return match.name === name && match.type === type
                else if (name === "all" && type !== "all")
                    return match.type === type
                else if (name !== "all" && type === "all")
                    return match.name === name
                else
                    return true
            })
        setState(state => ({
            ...state,
            matchList: filteredMatches,
        }))
    },

    /**
     * Filter match list by match id then return new array
     * @param value
     */
    matchSearch(value) {
        const searchedMatches = [...getState().matchListDataSource]
            .filter(match => match.id.includes(value))
        setState(state => ({
            ...state,
            matchList: searchedMatches
        }))
    },


    /**
     * The method get origin match list
     */
    matchToDefault() {
        setState(state => ({
            ...state,
            matchList: this.getOriginMatchList()
        }))
    },


    /**
     * The method return history of tournaments
     * Return a new array with 100 items
     */
    async matchHistoryFetch() {
        const {historySortedByDate} = await list
        // const {listSortedByDate} = await list
        // setState(state => ({
        //     ...state,
        //     dataSource: listSortedByDate,
        //     tournamentList: listSortedByDate
        // }))
    },

    /**
     * The method return origin match list
     * Return a new array
     */
    getOriginMatchList(): IMatch[] {
        return [...getState().matchListDataSource]
    }
}))