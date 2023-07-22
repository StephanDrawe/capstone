import React, { useContext } from 'react';
import './styles.css'
import { UserContext } from './Context';
import { useNavigate } from 'react-router-dom';

export function Logout () {

    // user context
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const toLogin = () => {
        navigate("/login")
    }

    return (
    <>
        <div>
                <button onClick={() => {
                    setUser(null);
                    toLogin()
                    console.log(user);
                }}
                >logout</button>
            
        </div>

    </>
    );
}
