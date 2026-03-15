
import { StyleSheet, View, Text, TextInput, Pressable} from 'react-native';

import { signupSchema } from "@/schemas/signupSchema"
import * as yup from "yup";
import { Formik } from 'formik';


export default function SignUpScreen() {


    return (
    <View>
        <Formik 
initialValues={{ fullName: "", email: "", password: "", confirmPassword: ""}}
        onSubmit={(values) => {
            console.log("You submitted: ", values);
        }}
        validationSchema={signupSchema}
        >
        {({     
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
        }) => (
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full name: </Text>
                    <TextInput
                        value={values.fullName}
                        onChangeText={handleChange("fullName")}
                        onBlur={handleBlur("fullName")}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email: </Text>
                    <TextInput
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password: </Text>
                    <TextInput
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputGroup}> 
                    <Text style={styles.label}>Confirm Password: </Text>
                    <TextInput
                        value={values.confirmPassword}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        style={styles.input}
                    />
                </View>

                <Pressable onPress={handleSubmit as any}>
                    <Text>Submit</Text>
                </Pressable>
            </View>
        )}
        </Formik>

    </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 28,
    textAlign: "center",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: 22,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  inputFocused: {
    borderColor: "#2563eb",
  },
  inputError: {
    borderColor: "#dc2626",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 13,
    marginTop: 6,
  },
  toggleButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  toggleButtonText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#93c5fd",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  resetButton: {
    marginTop: 14,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
  },
});
