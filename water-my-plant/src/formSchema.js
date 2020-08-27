// import * as yup from 'yup'

// const formSchema =yup.object().shape({
//     username: yup   
//     .string()
//     .min(3, "Name must be required 3 character long.")
//     .required("Name is required"),
//     number: yup   
//     .string()
//     .min(3, "Name must be required 3 character long.")
//     .required("Name is required"),
//     password: yup
//     .string()
//     .required('Password is required')
//     .min(8,"Passwords need 8 characters"),
// })
// export default formSchema 
import * as yup from 'yup'

const formschema = yup.object().shape({

    username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is Required"),
    phonenumber: yup   
    .string()
    .min(3, "Phone Number must be required 10 character long.")
    .required("Name is required"),
    password: yup
    .string()
    .required('Password is required')
    .min(8,"Passwords need 8 characters"),
})
export default formschema 

