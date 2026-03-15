import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>
        Welcome back. Please enter your details.
      </Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        validateOnMount={true}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            Alert.alert("Success", `Signed in as ${values.email}`);
            resetForm();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
          resetForm,
          setFieldTouched,
        }) => (
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "email" ? styles.inputFocused : null,
                  touched.email && errors.email ? styles.inputError : null,
                ]}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => {
                  handleBlur("email");
                  setFieldTouched("email", true);
                  setFocusedField(null);
                }}
                onFocus={() => setFocusedField("email")}
              />
              {touched.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "password" ? styles.inputFocused : null,
                  touched.password && errors.password
                    ? styles.inputError
                    : null,
                ]}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => {
                  handleBlur("password");
                  setFieldTouched("password", true);
                  setFocusedField(null);
                }}
                onFocus={() => setFocusedField("password")}
              />
              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
              >
                <Text style={styles.toggleButtonText}>
                  {showPassword ? "Hide Password" : "Show Password"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !isValid || isSubmitting ? styles.submitButtonDisabled : null,
              ]}
              onPress={() => handleSubmit()}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.submitButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => resetForm()}
            >
              <Text style={styles.resetButtonText}>Reset Form</Text>
            </TouchableOpacity>
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
