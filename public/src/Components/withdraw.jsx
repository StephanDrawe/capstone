import React, { useContext } from "react"
import { UserContext } from "./Context"
// add later {Form, Field, ErrorMessage,}
import { useFormik } from 'formik';
import './styles.css'
import { useNavigate } from 'react-router-dom';


export function Withdraw () {
    // formik form
    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = useFormik({
            initialValues: {
            amount: ''
        },
        onSubmit: values =>{
            console.log('form:', values);
            console.log(user._id);
            const updatedBalance = user;
            updatedBalance.balance = updatedBalance.balance - Number(values.amount);
            Withdraw(updatedBalance);
            toAccount();
        },
        validate: values => {
            let errors = {};
            if(!values.amount) {errors.amount = 'Field required'
                }else if(isNaN(values.amount)) {
                errors.amount = 'must be a number';
                }
            return errors;
        }
    });
    
    // withdraw
    const Withdraw = async (updatedBalance) => {
        fetch (`/account/update/${user.email}/${updatedBalance.balance}`, {
            method: "PATCH"
        })
        .then((res) => res.json())
        .catch(err => console.error("Error: ", err));
    }

    // user context
    const { user } = useContext(UserContext);

    const navigate = useNavigate();
    const toAccount = () => {
        navigate("/balance")
    }

    return (
        <>
            <h1>Withdraw</h1>

            <br/>
            <h6>Current Balance:</h6>
            <div>{user?.balance || ""}</div>
            
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
                type="submit">withdraw</button>
            </form>
        </>
    );
}

