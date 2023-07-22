import React, { useEffect, useState } from "react"
// import { UserContext } from "./Context"

const API_BASE = "http://localhost:3001";

export function AllData () {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        GetAccounts();
    }, [])

    const GetAccounts = () => {
        fetch(API_BASE + "/account/allData")
            .then(res => res.json())
            .then(data => setAccounts(data))
            .catch(err => console.error("Error: ", err));
    }

    return (
        <>
            <h1>AllData</h1>
                {accounts.map(account => (
                    <div key={account._id}>
                        {JSON.stringify(account)}
                    </div>
                ))}
        </>
    );
}