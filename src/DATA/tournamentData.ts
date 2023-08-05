import {uid} from "uid"
import {ITournament, ITournamentNameType, ITournamentType} from "../component/tournament/Tournament";

const getRandomNumber = (factor: number): number => Math.floor(Math.random() * factor)
const getRandomTournamentType = (): ITournamentType => {
    const tournamentTypes: ITournamentType[] = ["solo", "duo", "squad"]
    return tournamentTypes[getRandomNumber(tournamentTypes.length)]
}

const getRandomTournamentName = (): ITournamentNameType => {
    const tournamentNames: ITournamentNameType[] = ["daily", "custom", "sponsorship"]
    return tournamentNames[getRandomNumber(tournamentNames.length)]
}

const list = new Promise<ITournament[]>(resolve => {
    const list: ITournament[] = []
    for (let i = 0; i < 200; i++) {
        list.push({
            id: uid(),
            name: getRandomTournamentName(),
            type: getRandomTournamentType(),
            members: {
                max: 100,
                alreadyRegistered: getRandomNumber(100)
            },
            reward: {
                coin: getRandomNumber(1000)
            },
            price: {
                ticket: getRandomNumber(20),
                coin: getRandomNumber(20),
            },
            date: new Date(2023, getRandomNumber(8), getRandomNumber(31), getRandomNumber(24), getRandomNumber(60)),
            condition: {
                rank: getRandomNumber(5),
                premium: getRandomNumber(2) % 2 === 0
            },
        })
    }
    resolve(list)
})

export default list