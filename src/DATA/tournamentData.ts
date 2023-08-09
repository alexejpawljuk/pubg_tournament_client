import {uid} from "uid"
import {IPlayer, ITournament, ITournamentNameType, ITournamentType} from "../component/tournament/Tournament"
import {isAfter} from "date-fns"


const getRandomNumber = (factor: number): number => Math.floor(Math.random() * factor)
const getRandomTournamentType = (): ITournamentType => {
    const tournamentTypes: ITournamentType[] = ["solo", "duo", "squad"]
    return tournamentTypes[getRandomNumber(tournamentTypes.length)]
}

const getRandomTournamentName = (): ITournamentNameType => {
    const tournamentNames: ITournamentNameType[] = ["daily", "custom", "sponsorship"]
    return tournamentNames[getRandomNumber(tournamentNames.length)]
}

const objectsList: IPlayer[] = [
    {
        nickname: "user1",
        id: "id1",
        rank: 10,
        avatar: "avatar1.jpg",
        premium: true
    },
    {
        nickname: "user2",
        id: "id2",
        rank: 5,
        avatar: "avatar2.jpg",
        premium: false
    },
    {
        nickname: "user3",
        id: "id3",
        rank: 15,
        avatar: "avatar3.jpg",
        premium: true
    },
    {
        nickname: "user4",
        id: "id4",
        rank: 8,
        avatar: "avatar4.jpg",
        premium: false
    },
    {
        nickname: "user5",
        id: "id5",
        rank: 25,
        avatar: "avatar5.jpg",
        premium: true
    },
    {
        nickname: "user6",
        id: "id6",
        rank: 12,
        avatar: "avatar6.jpg",
        premium: false
    },
    {
        nickname: "user7",
        id: "id7",
        rank: 18,
        avatar: "avatar7.jpg",
        premium: true
    },
    {
        nickname: "user8",
        id: "id8",
        rank: 3,
        avatar: "avatar8.jpg",
        premium: false
    },
    {
        nickname: "user9",
        id: "id9",
        rank: 9,
        avatar: "avatar9.jpg",
        premium: true
    },
    {
        nickname: "user10",
        id: "id10",
        rank: 14,
        avatar: "avatar10.jpg",
        premium: false
    },
    {
        nickname: "user11",
        id: "id11",
        rank: 7,
        avatar: "avatar11.jpg",
        premium: true
    },
    {
        nickname: "user12",
        id: "id12",
        rank: 22,
        avatar: "avatar12.jpg",
        premium: false
    },
    {
        nickname: "user13",
        id: "id13",
        rank: 17,
        avatar: "avatar13.jpg",
        premium: true
    },
    {
        nickname: "user14",
        id: "id14",
        rank: 6,
        avatar: "avatar14.jpg",
        premium: false
    },
    {
        nickname: "user15",
        id: "id15",
        rank: 11,
        avatar: "avatar15.jpg",
        premium: true
    },
    {
        nickname: "user16",
        id: "id16",
        rank: 4,
        avatar: "avatar16.jpg",
        premium: false
    },
    {
        nickname: "user17",
        id: "id17",
        rank: 19,
        avatar: "avatar17.jpg",
        premium: true
    },
    {
        nickname: "user18",
        id: "id18",
        rank: 13,
        avatar: "avatar18.jpg",
        premium: false
    },
    {
        nickname: "user19",
        id: "id19",
        rank: 16,
        avatar: "avatar19.jpg",
        premium: true
    },
    {
        nickname: "user20",
        id: "id20",
        rank: 2,
        avatar: "avatar20.jpg",
        premium: false
    },
    {
        nickname: "user21",
        id: "id21",
        rank: 21,
        avatar: "avatar21.jpg",
        premium: true
    },
    {
        nickname: "user22",
        id: "id22",
        rank: 9,
        avatar: "avatar22.jpg",
        premium: false
    },
    {
        nickname: "user23",
        id: "id23",
        rank: 8,
        avatar: "avatar23.jpg",
        premium: true
    },
    {
        nickname: "user24",
        id: "id24",
        rank: 14,
        avatar: "avatar24.jpg",
        premium: false
    },
    {
        nickname: "user25",
        id: "id25",
        rank: 10,
        avatar: "avatar25.jpg",
        premium: true
    },
    {
        nickname: "user26",
        id: "id26",
        rank: 6,
        avatar: "avatar26.jpg",
        premium: false
    },
    {
        nickname: "user27",
        id: "id27",
        rank: 17,
        avatar: "avatar27.jpg",
        premium: true
    },
    {
        nickname: "user28",
        id: "id28",
        rank: 12,
        avatar: "avatar28.jpg",
        premium: false
    },
    {
        nickname: "user29",
        id: "id29",
        rank: 23,
        avatar: "avatar29.jpg",
        premium: true
    },
    {
        nickname: "user30",
        id: "id30",
        rank: 20,
        avatar: "avatar30.jpg",
        premium: false
    }
];



const list = new Promise<ITournament[]>(resolve => {
    const list: ITournament[] = []
    for (let i = 0; i < 1000; i++) {
        const item: ITournament = {
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
            meta: {
                players: objectsList
            }
        }

        if (isAfter(item.date.getTime(), new Date().getTime())) list.push(item)
        else i--
    }

    const listSortedByDate = list.sort((a, b) => a.date.getTime() - b.date.getTime())
    resolve(listSortedByDate)
})

export default list