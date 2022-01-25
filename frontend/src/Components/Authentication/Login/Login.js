import React, { useState } from 'react'
import { Link } from'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Header from '../../../Utils/Header/Header'

//MUI Components
import { Box, TextField, InputAdornment, IconButton, Grid, Button } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function Login() {
    const [value, setvalue] = useState({showPassword: false})
    const handleClickShowPassword = () => {
        setvalue({
            ...value,
            showPassword: !value.showPassword,
        })
    }
    const loginValidationSchema = Yup.object().shape({
        email: Yup
            .string('Enter your email address')
            .required('Email address is required')
            .email('Enter a valid email address'),
        password: Yup
            .string('Enter your password')
            .required('The password is required')
            .min(8, 'Password must have at least 8 characters')
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema :loginValidationSchema,
        onSubmit: data => console.log(JSON.stringify(data, null, 2))
    })
    return (
        <Box>
            <Grid 
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
            <Grid item xs='auto'>
                <Header 
                    title='Welcome Back!'
                    text='Enter your details to login'
                />    
            </Grid>          
            <form onSubmit={formik.handleSubmit}>
            <Grid item xs='auto'>
                <TextField 
                        required
                        variant='standard'
                        id='email'
                        name='email'
                        label='Email Address'
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onChange={formik.handleChange}
                    />    
            </Grid>
            <Grid item xs='auto'>
                <TextField 
                    required
                    variant='standard'
                    id='password'
                    name='password'
                    label='Password'
                    type={value.showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    helperText={formik.touched.password && formik.errors.password}
                    onChange={formik.handleChange}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibilty'
                                    onClick={handleClickShowPassword}
                                >
                                    {value.showPassword? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>    
                    }} 
                />
            </Grid>
            <Grid item xs='auto'>
                <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    Submit
                </Button>       
            </Grid>
            <p>New here? <Link to='/signup'>Create an account.</Link> </p>
            </form>
            </Grid>
            
        </Box>
    )
}

export default Login
