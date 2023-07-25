import {Dispatch, SetStateAction, useEffect, useState} from "react"


type IWindowSize = {
    height: number
    width: number
}

interface IUseWindowSize {
    size: IWindowSize,
    setSize: Dispatch<SetStateAction<IWindowSize>>
}

export const useWindowSize = (): IUseWindowSize => {
    const [size, setSize] = useState<IWindowSize>({height: window.innerHeight, width: window.innerWidth})

    const resizeHandle = () => {
        setSize({height: window.innerHeight, width: window.innerWidth})
    }

    useEffect(() => {
        window.addEventListener("resize", resizeHandle)

        return () => {
            window.removeEventListener("resize", resizeHandle)
        }
    }, [])

    return {
        size, setSize
    }
}