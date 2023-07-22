import React, { useState } from 'react';
// Form, Field, ErrorMessage use later
import { useFormik } from 'formik';
import './styles.css'

const API_BASE = "http://localhost:3001";

export function CreateAccount () {

    const [error, setError] = useState('');



    const addAccount = async () => {
        const account = await fetch(API_BASE + "/account/create", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password
            })
        }).then(res => res.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                console.log(data);
                setError('Account Created!');
            } catch(err) {
                setError(text);
            }
        })
        .catch(err => console.error("Error: ", err));
        console.log(account);
    }

    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        onSubmit: values =>{
            // console.log('form:', values);
            addAccount();
            // ctx.accounts.push({
            //     username: values.username, email: values.email, password: values.password, amount: 0
            // });
            // setUser(ctx);
            // alert("Account Created!");
        },
        validate: values => {
            let errors = {};
            if(!values.username) errors.username = 'Field required'
            if(!values.email) {errors.email = 'Field required'
            } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email format';
            }
            if(!values.password) errors.password = 'Field required'
            return errors;
        }
    });


    // console.log(formik.values);
    // console.log(user);

    return (
        <>

        <div className='error'>{error}</div>

        <form 
            className='formik'
            onSubmit={handleSubmit}>
            <div className='form-control'>
                <label>Username</label>
                <input 
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='username' 
                    type='username' 
                    placeholder='Enter Your Name'
                />
                {touched.username && errors.username ? <div className='error'>{errors.username}</div> : null}
            </div>
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
                type="submit"
                >Submit</button>
        </form>
        </>
    );
}
