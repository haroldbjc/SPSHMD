import * as Yup from 'yup';

export const validationSchema = {
  username: Yup.string().required('Username is required').max(20, 'Username must be less than 20 characters'),
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
};
