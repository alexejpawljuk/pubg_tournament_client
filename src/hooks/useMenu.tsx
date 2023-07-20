import {MenuItemProps, MenuProps} from "antd"
import React, {
    Dispatch, ReactNode,
    SetStateAction,
    useState
} from "react"
import {MenuItemType} from "antd/es/menu/hooks/useItems";

interface IUseMenu {
    menuProps: {
        menuProps: MenuProps
        setMenuProps: Dispatch<SetStateAction<MenuProps>>
    }
    menuCollapse: {
        collapsed: boolean
        setCollapsed: Dispatch<SetStateAction<boolean>>
    }
}

export const useMenu = (props: MenuProps): IUseMenu => {
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const [menuProps, setMenuProps] = useState<MenuProps>(props)



    return {
        menuProps: {menuProps, setMenuProps},
        menuCollapse: {collapsed, setCollapsed}
    }
}