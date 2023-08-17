import React from 'react'
import {FloatButton} from "antd"
import {ModalPopupService} from "../../service/ModelPopupService"
import Community from "./Community"
import {FaPeopleRoof} from "react-icons/fa6"

const CommunityFloatButton = () => {
    const modalPopupService = ModalPopupService()

    const onClickChat = () => {
        modalPopupService.setOpenModal(prevState => ({
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