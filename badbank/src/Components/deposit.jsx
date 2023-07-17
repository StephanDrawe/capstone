import React, { useState, useEffect } from "react"
// add later {Form, Field, ErrorMessage,}
import { useFormik } from 'formik';
import './styles.css'
// import { useNavigate } from 'react-router-dom';

const API_BASE = "http://localhost:3001";

export function Deposit () {
    // 
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



    // formik form
    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = useFormik({
            initialValues: {
            amount: ''
        },
        onSubmit: values =>{
            console.log('form:', values);
            // alert("Login Success!");
        },
        validate: values => {
            let errors = {};
            if(!values.amount) errors.amount = 'Field required'
            return errors;
        }
    });
    
    // const navigate = useNavigate();
    // const toAccount = () => {
    //     navigate("/balance")
    // }

    return (
        <>
            <h1>Deposit</h1>
            {accounts.map(account => (
                    <div key={account._id}>
                        {JSON.stringify(account)}
                    </div>
                ))}

            
            <form 
                className='formik'
                onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label>Amount</label>
                    <input 
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id='amount' 
                        type='amount' 
                        placeholder='Enter Your deposit amount'
                    />
                    {touched.amount && errors.amount ? <div className='error'>{errors.amount}</div> : null}
                </div>
                <button
                id='submit' 
                type="submit">deposit</button>
            </form>
        </>
    );
}

