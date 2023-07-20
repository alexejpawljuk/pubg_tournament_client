import {MenuProps} from "antd"
import {
    Dispatch,
    SetStateAction,
    useState
} from "react"

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

export const useMenu = (props: { menuProps: MenuProps, collapsed?: boolean }): IUseMenu => {
    const [collapsed, setCollapsed] = useState<boolean>(props.collapsed ?? true)
    const [menuProps, setMenuProps] = useState<MenuProps>(props.menuProps)

    return {
        menuProps: {menuProps, setMenuProps},
        menuCollapse: {collapsed, setCollapsed}
    }
}