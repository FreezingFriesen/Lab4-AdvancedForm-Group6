import * as Yup from 'yup';

export const employeeSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name is too short') // Length validation
    .max(50, 'Name is too long')
    .required('Full Name is required'), // Required field
  email: Yup.string()
    .email('Invalid email format') // Format validation
    .required('Email is required'),
  employeeId: Yup.string()
    .matches(/^EMP-\d{4}$/, 'Format must be EMP-0000') // Format validation
    .required('Employee ID is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Must be exactly 10 digits') // Length validation
    .required('Phone number is required'),
  department: Yup.string()
    .required('Department selection is required'),
});