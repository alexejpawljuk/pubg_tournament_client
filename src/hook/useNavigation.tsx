import {MenuProps} from "antd"
import {LeftMenuKey, RightMenuKey} from "../component/navigation/Navigation"
import AuthForm from "../component/AuthForm"
import RegisterForm from "../component/RegisterForm"
import Wallet from "../component/Wallet"
import React from "react"
import {ModalPopupService} from "../service/ModelPopupService"
import {AppUserThemeService} from "../service/AppUserThemeService"
import Shop from "../component/shop/Shop"

export type MenuItem = Required<MenuProps>['items'][number]
type GetItemType = (label: React.ReactNode, key: RightMenuKey | LeftMenuKey, icon?: React.ReactNode, children?: MenuItem[], type?: "group" | "divider") => MenuItem

interface IUseNavigationReturn {
    leftSide: {
        onClick: MenuProps["onClick"]
    }
    rightSide: {
        onClick: MenuProps["onClick"]
    }
    getItem: GetItemType
}

const useNavigation = (): IUseNavigationReturn => {
    const modalPopupService = ModalPopupService()
    const {setAppUserTheme} = AppUserThemeService()

    return {
        getItem(label, key, icon, children, type) {
            return {key, icon, children, type, label} as MenuItem
        },

        leftSide: {
            onClick(e) {
                switch (e.key as LeftMenuKey) {
                    case "home":
                        window.location.replace("/")
                        break;

                    case "shop":
                        // window.location.replace("/shop")
                        modalPopupService.setOpenModal(prevState => ({
                            ...prevState,
                            openModal: true,
                            props: {
                                width: 550,
                            },
                            children: <Shop/>
                        }))
                        break;
                }
            }
        },

        rightSide: {
            onClick(e) {
                console.log(e)
                switch (e?.key as RightMenuKey) {
                    case "login":
                        modalPopupService.setOpenModal(prevState => ({
                            ...prevState,
                            openModal: true,
                            children: <AuthForm/>,
                            props: {width: 350}
                        }))
                        break;

                    case "register":
                        modalPopupService.setOpenModal(prevState => ({
                            ...prevState,
                            openModal: true,
                            props: {
                                width: 800
                            },
                            children: <RegisterForm/>
                        }))
                        break;

                    case "dark":
                        setAppUserTheme(() => "dark")
                        break;

                    case "light":
                        setAppUserTheme(() => "light")
                        break;

                    case "profile":
                        window.location.replace("/profile")
                        break;

                    case "buy_coins":
                        modalPopupService.setOpenModal(prevState => ({
                            ...prevState,
                            openModal: true,
                            props: {
                                width: 500
                            },
                            children: <div>Тут будет инструкция как пополнить кошелек (крипта)</div>
                        }))
                        break;

                    case "my_wallet":
                        modalPopupService.setOpenModal(prevState => ({
                            ...prevState,
                            openModal: true,
                            children: <Wallet/>
                        }))
                        break;
                }
            }
        }
    }
}

export {useNavigation}