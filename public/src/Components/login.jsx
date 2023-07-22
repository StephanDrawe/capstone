import React, { useContext, useState } from 'react';
// add later {Form, Field, ErrorMessage,}
import { useFormik } from 'formik';
import './styles.css'
import { UserContext } from './Context';
import { useNavigate } from 'react-router-dom';

const API_BASE = "http://localhost:3001";

export function Login () {
    const [error, setError] = useState('');

    // formik form
    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values =>{
            // console.log('form:', values);
            Login();
        },
        validate: values => {
            let errors = {};
            if(!values.email) {errors.email = 'Field required'
            } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email format';
            }
            if(!values.password) errors.password = 'Field required'
            return errors;
        }
    });


    const Login = () => {
        fetch(API_BASE + `/account/login/${values.email}/${values.password}`)
            .then(res => res.text())
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    setUser(data);
                    console.log(user);
                    toAccount();
                } catch(err) {
                    console.log('Error:', text);
                    setError(text);
                }
            })
            .catch(err => console.error("Error: ", err));
    }

    // user context
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const toAccount = () => {
        navigate("/balance")
    }


    return (
    <>
        <div className='error'>{error}</div>

        <form 
            className='formik'
            onSubmit={handleSubmit}>
            <div className='form-control'>
                <label>Email</label>
                <input 
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='email' 
                    type='email' 
                    placeholder='Enter Your Email'
                />
                {touched.email && errors.email ? <div className='error'>{errors.email}</div> : null}
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input 
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='password' 
                    type='password' 
                    placeholder='Enter Your Password'
                />
                {touched.password && errors.password ? <div className='error'>{errors.password}</div> : null}
            </div>
            <button
                id='submit' 
                type="submit">Login</button>
        </form>
    </>
    );
}
