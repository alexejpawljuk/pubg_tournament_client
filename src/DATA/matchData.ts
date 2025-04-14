import {uid} from "uid"
import {IPlayer, IMatch, IMatchNameType, IMatchType} from "../component/match/Match"
import {isAfter} from "date-fns"
import {playerListData} from "./playerListData";


const getRandomNumber = (factor: number): number => Math.floor(Math.random() * factor)
const getRandomFloat = (factor: number): number => Math.random() * factor

const getRandomTournamentType = (): IMatchType => {
    const tournamentTypes: IMatchType[] = ["solo", "duo", "squad"]
    return tournamentTypes[getRandomNumber(tournamentTypes.length)]
}

const getRandomTournamentName = (): IMatchNameType => {
    const tournamentNames: IMatchNameType[] = ["daily", "custom", "sponsorship"]
    return tournamentNames[getRandomNumber(tournamentNames.length)]
}

const playerList: IPlayer[] = [
    {
        nickname: "user1",
        id: "id1",
        rank: 10,
        avatar: "avatar1.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user2",
        id: "id2",
        rank: 5,
        avatar: "",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user3",
        id: "id3",
        rank: 15,
        avatar: "",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user4",
        id: "id4",
        rank: 8,
        avatar: "",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user5",
        id: "id5",
        rank: 25,
        avatar: "",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user6",
        id: "id6",
        rank: 12,
        avatar: "avatar6.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user7",
        id: "id7",
        rank: 18,
        avatar: "avatar7.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user8",
        id: "id8",
        rank: 3,
        avatar: "avatar8.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user9",
        id: "id9",
        rank: 9,
        avatar: "avatar9.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user10",
        id: "id10",
        rank: 14,
        avatar: "avatar10.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user11",
        id: "id11",
        rank: 7,
        avatar: "avatar11.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user12",
        id: "id12",
        rank: 22,
        avatar: "avatar12.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user13",
        id: "id13",
        rank: 17,
        avatar: "avatar13.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user14",
        id: "id14",
        rank: 6,
        avatar: "avatar14.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user15",
        id: "id15",
        rank: 11,
        avatar: "avatar15.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user16",
        id: "id16",
        rank: 4,
        avatar: "avatar16.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user17",
        id: "id17",
        rank: 19,
        avatar: "avatar17.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user18",
        id: "id18",
        rank: 13,
        avatar: "avatar18.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user19",
        id: "id19",
        rank: 16,
        avatar: "avatar19.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user20",
        id: "id20",
        rank: 2,
        avatar: "avatar20.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user21",
        id: "id21",
        rank: 21,
        avatar: "avatar21.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user22",
        id: "id22",
        rank: 9,
        avatar: "avatar22.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user23",
        id: "id23",
        rank: 8,
        avatar: "avatar23.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user24",
        id: "id24",
        rank: 14,
        avatar: "avatar24.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user25",
        id: "id25",
        rank: 10,
        avatar: "avatar25.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user26",
        id: "id26",
        rank: 6,
        avatar: "avatar26.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user27",
        id: "id27",
        rank: 17,
        avatar: "avatar27.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user28",
        id: "id28",
        rank: 12,
        avatar: "avatar28.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user29",
        id: "id29",
        rank: 23,
        avatar: "avatar29.jpg",
        premium: true,
        teamId: null,
        experience: 0,
    },
    {
        nickname: "user30",
        id: "id30",
        rank: 20,
        avatar: "avatar30.jpg",
        premium: false,
        teamId: null,
        experience: 0,
    }
];


const list = new Promise<{ listSortedByDate: IMatch[], historySortedByDate: IMatch[] }>((resolve) => {
    const list: IMatch[] = []
    const history: IMatch[] = []

    for (let i = 0; i < 100; i++) {
        // const playerList: IPlayer[] = []

        const item: IMatch = {
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
            date: {
                start: new Date(new Date().getFullYear(), getRandomNumber(12), getRandomNumber(31), getRandomNumber(24), getRandomNumber(60)),
                end: null
            },
            condition: {
                rank: getRandomNumber(5),
                premium: getRandomNumber(2) % 2 === 0
            },
            donation: getRandomNumber(100),
            meta: {
                players: playerList.map((player, index) => ({
                    ...player,
                    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
                    rank: getRandomNumber(5),
                    experience: getRandomNumber(100),
                    id: uid(7),
                })),
                winner: null
            }
        }

        if (isAfter(item.date.start.getTime(), new Date().getTime()))
            list.push(item)

        else {
            if (history.length < 100) {
                history.push({
                    ...item,
                    date: {
                        ...item.date,
                        end: new Date(item.date.start.getTime() + 3600000)
                    },
                    meta: {
                        ...item.meta,
                        winner: {
                            nickname: "User" + i.toString(),
                            avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
                            rank: getRandomNumber(5),
                            experience: getRandomNumber(100),
                            id: uid(7),
                            premium: !!getRandomNumber(1),
                            teamId: null,
                        }
                    }
                })
            }
            i--
        }
    }

    const listSortedByDate = list.sort((a, b) => a.date.start.getTime() - b.date.start.getTime())
    const historySortedByDate = history.sort((a, b) => b.date.start.getTime() - a.date.start.getTime())
    resolve({listSortedByDate, historySortedByDate})
})


export {list}