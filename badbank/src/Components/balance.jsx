
import React, { useContext } from "react"
import { UserContext } from "./Context"


export function Balance () {

    // user context
    const { user } = useContext(UserContext);

    return (
        <>
            <h1>Balance</h1>
            <div>{user?.balance || ""}</div>
        </>
    );
}
