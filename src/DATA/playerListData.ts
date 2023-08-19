import {IPlayer} from "../component/match/Match"
import {uid} from "uid"

const getRandomNumber = (factor: number): number => Math.floor(Math.random() * factor)

const playerListData = new Promise<IPlayer[]>(resolve => {
    const playerList: IPlayer[] = []
    for (let i = 0; i < getRandomNumber(100); i++) {
        playerList.push({
            id: uid(),
            nickname: `User ${i}`,
            rank: getRandomNumber(5),
            avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
            premium: !!getRandomNumber(2),
            teamId: null,
            experience: getRandomNumber(100)
        })
    }
    resolve(playerList)
})

export {playerListData}