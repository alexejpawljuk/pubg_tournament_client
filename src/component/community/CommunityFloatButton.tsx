import React from 'react'
import {FloatButton} from "antd"
import {useModalPopup} from "../../store/useModelPopup"
import {BsChatDots} from "react-icons/bs"
import Community from "./Community"

const CommunityFloatButton = () => {
    const modalPopup = useModalPopup()

    const onClickChat = () => {
        modalPopup.setOpenModal(prevState => ({
            ...prevState,
            openModal: true,
            props: {
                width: 400,
            },
            children: <Community/>
        }))
    }


    return (
        <>
            <FloatButton
                tooltip={"CommunityFloatButton"}
                onClick={onClickChat}
                icon={<BsChatDots/>}
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