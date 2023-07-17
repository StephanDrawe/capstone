import React, { useContext } from "react"
import { UserContext } from "./Context"
// add later {Form, Field, ErrorMessage,}
import { useFormik } from 'formik';
import './styles.css'
// import { useNavigate } from 'react-router-dom';

export function Withdraw () {
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
    
    // user context
    const { user, setUser } = useContext(UserContext);
    // const navigate = useNavigate();
    // const toAccount = () => {
    //     navigate("/balance")
    // }

    return (
        <>
            <h1>Withdraw</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={() => setUser('Withdraw')}>change value</button>
            <br />
            
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

