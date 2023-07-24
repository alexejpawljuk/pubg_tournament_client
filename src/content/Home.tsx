import React from 'react'
import ModalPopup from "../components/ModalPopup"
import TournamentList from "../components/ListTournament"
import MainLayout from "../components/MainLayout"

const Home = () => {
    return (
        <MainLayout>
            {/*<CardTournament/>*/}
            {/*<ModalPopup/>*/}
            <TournamentList/>
        </MainLayout>
    )
}

export default Home