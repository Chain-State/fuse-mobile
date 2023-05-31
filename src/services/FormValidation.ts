import * as Yup from 'yup';



export const RegisterBasicSchema = Yup.object().shape({
    fname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    sname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    phone: Yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Short!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
        .required('Required'),
    confirmpassword: Yup.string()
        .min(8, 'Too Short!')
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required('Required'),
})

export const RegisterKycSchema = Yup.object().shape({
    id: Yup.number().min(5, "Too Short").required('Required'),
    dob: Yup.number().min(6, 'Must be a valid date').required('Required')
})