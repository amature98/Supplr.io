import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Header from '../../../Utils/Header/Header'

//MUI Components
import { Stack, TextField, InputAdornment, IconButton, Button, Grid } from '@mui/material'
import { Visibility,  VisibilityOff} from '@mui/icons-material'

function Signup() {
    //Defining icon value for password
    const [value, setvalue] = useState({showPassword: false})
    //Event handler to show password
    const handleClickShowPassword = () => {
        setvalue({
            ...value,
            showPassword: !value.showPassword
        })
    }

    // Defining Yup validation schema
    const signUpValidationSchema = Yup.object().shape({
        email: Yup
            .string("Please enter your email address")
            .required("Email address is required")
            .email("Enter a valid email address."),
        password: Yup
            .string("Enter your password")
            .required("Password is required")
            .min(8, "Password must be atleast 8 charcters")
    })

    //Use useFormik a custom React hook to manage form values 
    //Returns all Formik state and helpers 
    const formik = useFormik({
        //Object for initial values of the form fields
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: signUpValidationSchema,
        //Function for handling form submission.receives form data
        onSubmit: data => console.log(JSON.stringify(data, null,2))
    })
    return (
        <Stack spacing={2} alignItems="">
            <Grid 
                container  
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs = 'auto'>
                    <Header 
                        title='Hi there!'
                        text='Create an account with us'
                    />    
                </Grid>
                <form onSubmit={formik.handleSubmit}>
                    <Grid item xs='auto'>
                        <TextField 
                            fullWidth
                            required
                            variant='standard'
                            id='email'
                            name='email'
                            label='Email Address'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />    
                    </Grid>
                    <Grid item xs='auto'>
                        <TextField
                            required
                            variant='standard'
                            type={value.showPassword ? 'text': 'password'}
                            id='password'
                            name='password'
                            label='Password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibilty'
                                            onClick={handleClickShowPassword}
                                        >
                                            {value.showPassword? <Visibility/> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>    
                            }}
                        />    
                    </Grid>
                    <Grid item xs='auto'>
                        <Button 
                            fullWidth
                            type='submit' 
                            color='primary' 
                            variant='contained' 
                        >
                            Submit
                        </Button>    
                    </Grid>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </form>     
            </Grid>
        </Stack>
    )
}

export default Signup
