import {ReactNode, useContext} from "react";
import {AuthContext} from "../common/AuthContext";

type Props = {
    children: ReactNode
}
export default function ShowWhenAuthenticated(props: Props) {
    const {isAuthenticated} = useContext(AuthContext)
    const {children} = props

    return (
        <>
            {
                isAuthenticated &&
                children
            }
        </>
    )
}