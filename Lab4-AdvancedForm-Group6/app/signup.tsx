
import { StyleSheet, View, Text, TextInput} from 'react-native';

import { employeeSchema } from '@/schemas/employeeSchema';
import * as yup from "yup";
import { Formik } from 'formik';


export default function SignUpScreen() {


    return (
    <View>
        <Formik 
initialValues={{ name: "", email: "", password: "", confirmpassword: ""}}>
        onSubmit={(values) => {
            console.log("You submitted: ", values);
        }}
        {({     
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
        }) => (
            <View>
                <Text>Full name: </Text>
                <TextInput
                    value={values.name}
                    onChangeText={handleChange("name")}
                />
            </View>
        )}
        </Formik>

    </View>
    );

}

const styles = StyleSheet.create({})