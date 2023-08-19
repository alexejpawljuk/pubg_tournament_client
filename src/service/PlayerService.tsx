import {create} from "zustand"
import {IPlayer} from "../component/match/Match"
import {playerListData} from "../DATA/playerListData"


interface IPlayerService {
    readonly dataSource: Readonly<IPlayer[]>
    playerLis: IPlayer[]

    playerListFetch(tournamentId: string): Promise<void>
}

export const PlayerService = create<IPlayerService>((setState, getState) => ({
    dataSource: [],
    playerLis: [],

    async playerListFetch(tournamentId: string) {
        const list: IPlayer[] = await playerListData
        setState(state => ({
            ...state,
            dataSource: list,
            playerLis: list
        }))
    }
}))