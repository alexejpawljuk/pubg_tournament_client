import {useEffect} from "react"


export const useLogger = (value: any) => {
    useEffect(() => {
        console.log("Logger info:", value)
    }, [value])
}