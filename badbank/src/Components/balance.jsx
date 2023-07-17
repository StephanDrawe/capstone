
import React, { useEffect, useState } from "react"
// import { UserContext } from "./Context"

const API_BASE = "http://localhost:3001";

export function Balance () {
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
            <h1>Balance</h1>
                {accounts.map(account => (
                    <div key={account._id}>
                        {JSON.stringify(account)}
                    </div>
                ))}
        </>
    );
}

// import React, { useContext } from "react"
// import { UserContext } from "./Context"

// export function Balance () {
//     const {user, setUser} = useContext(UserContext);

//     return (
//         <>
//             <h1>Balance</h1>
//             <pre>{JSON.stringify(user, null, 2)}</pre>
//             <button onClick={() => setUser('Balance')}>change value</button>
//         </>
//     );
// }