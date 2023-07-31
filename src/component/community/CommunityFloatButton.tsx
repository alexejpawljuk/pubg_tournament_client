import React from 'react'
import {FloatButton} from "antd"
import {useModalPopup} from "../../store/useModelPopup"
import {BsChatDots} from "react-icons/bs"
import Community from "./Community"
import {FaPeopleRoof} from "react-icons/fa6";

const CommunityFloatButton = () => {
    const modalPopup = useModalPopup()

    const onClickChat = () => {
        modalPopup.setOpenModal(prevState => ({
            ...prevState,
            openModal: true,
            props: {
                width: 800,
            },
            children: <Community/>
        }))
    }


    return (
        <>
            <FloatButton
                tooltip={"CommunityFloatButton"}
                onClick={onClickChat}
                icon={<FaPeopleRoof/>}
                badge={{
                    count: 5,
                    color: "orange",
                    offset: [5, -10]
                }}
            />
        </>
    );
};

export default CommunityFloatButton