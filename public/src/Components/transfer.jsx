import React, { useContext, useState } from "react"
import { UserContext } from "./Context"
// add later {Form, Field, ErrorMessage,}
import { useFormik } from 'formik';
import './styles.css'
import { useNavigate } from 'react-router-dom';

// const API_BASE = "http://localhost:3001";

export function Transfer () {

    const [error, setError] = useState('');

    // formik form
    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = useFormik({
            initialValues: {
            amount: '',
            email: ''
        },
        onSubmit: values =>{
            const updatedBalance = user;
            findAccount(values.email, updatedBalance, values.amount);
        },
        validate: values => {
            let errors = {};
            if(!values.amount) {errors.amount = 'Field required'
                }else if(isNaN(values.amount)) {
                errors.amount = 'must be a number';
                }
            if(!values.email) {errors.email = 'Field required'
                } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email format';
                }
            return errors;
        }
    });

    // find transfer account
    const findAccount = (email, updatedBalance, amount) => {
        fetch(`/account/transfer/${email}/`)
            .then(res => res.text())
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    Withdraw(updatedBalance, amount);
                    Transfer(data, amount);
                    toAccount();
                } catch(err) {
                    console.log('Error:', text);
                    setError(text);
                }
            })
            .catch(err => console.error("Error: ", err));
    }

    // withdraw
    const Withdraw = async (updatedBalance, amount) => {
        updatedBalance.balance = updatedBalance.balance - Number(amount);
        fetch (`/account/update/${user.email}/${updatedBalance.balance}`, {
            method: "PATCH"
        })
        .then((res) => res.json())
        .catch(err => console.error("Error: ", err));
    }

    // transfer
    const Transfer = async (data, amount) => {
        data.balance = data.balance + Number(amount);
        fetch (`/account/update/${data.email}/${data.balance}`, {
            method: "PATCH"
        })
        .then((res) => res.json())
        .catch(err => console.error("Error: ", err));
    }
    // user context
    const { user } = useContext(UserContext);

    const navigate = useNavigate();
    const toAccount = () => {
        navigate("/allData")
    }

    return (
        <>
            <h1>Transfer</h1>

            <br/>
            <h6>Current Balance:</h6>
            <div>{user?.balance || ""}</div>

            <div className='error'>{error}</div>
            
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
                <div className='form-control'>
                    <label>Transferee Email</label>
                    <input 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id='email' 
                        type='email' 
                        placeholder='Enter Transferee email'
                    />
                    {touched.email && errors.email ? <div className='error'>{errors.email}</div> : null}
                </div>
                <button
                id='submit' 
                type="submit">transfer</button>
            </form>
        </>
    );
}

