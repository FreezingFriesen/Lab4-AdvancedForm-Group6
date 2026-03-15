
import { StyleSheet, View } from 'react-native';

import { employeeSchema } from '@/schemas/employeeSchema';
import * as yup from "yup";
import { Formik } from 'formik';


export default function SignUpScreen() {


    return 
    (
    <View>
        <Formik 
        initialValues={{ name: "", email: "", password: "", confirmpassword: ""}}>

        </Formik>

    </View>
    )

}

const styles = StyleSheet.create({})