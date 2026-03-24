import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Name is too short') // Length validation
        .max(50, 'Name is too long')
        .required('Full Name is required'), // Required field
    email: Yup.string()
        .email('Invalid email format') // Format validation
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be more than 6 characters')
        .max(20, 'Password must be less than 20 characters')
       .required('Password is required'),
    //    .matches(/^(?=.*[A-Za-z0-9])+$/, 
    //         "Password can only contain numbers and letters"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required('Please confirm your password')

})