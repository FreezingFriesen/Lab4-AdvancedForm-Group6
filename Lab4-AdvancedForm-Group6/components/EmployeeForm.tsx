import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { employeeSchema } from '../schemas/employeeSchema';

export default function EmployeeForm() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const renderInput = (
    label: string,
    fieldName: string,
    iconName: keyof typeof MaterialCommunityIcons.glyphMap,
    placeholder: string,
    keyboardType: 'default' | 'email-address' | 'numeric' = 'default',
    { handleChange, handleBlur, values, errors, touched, setFieldTouched }: any
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        focusedField === fieldName ? styles.inputFocused : null,
        touched[fieldName] && errors[fieldName] ? styles.inputError : null,
      ]}>
        <MaterialCommunityIcons name={iconName} size={20} color="#6b7280" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={values[fieldName]}
          onChangeText={handleChange(fieldName)}
          onFocus={() => setFocusedField(fieldName)}
          onBlur={() => {
            handleBlur(fieldName);
            setFieldTouched(fieldName, true);
            setFocusedField(null);
          }}
        />
      </View>
      {touched[fieldName] && errors[fieldName] ? (
        <Text style={styles.errorText}>{errors[fieldName]}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Info</Text>
      <Text style={styles.subtitle}>Please enter the employee registration details.</Text>

      <Formik
        initialValues={{ fullName: '', email: '', employeeId: '', phoneNumber: '', department: '' }}
        validationSchema={employeeSchema}
        validateOnMount={true}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            Alert.alert("Success", `Employee ${values.fullName} Registered`);
            resetForm();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {(formikProps) => (
          <ScrollView 
            style={styles.form} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {renderInput("Full Name", "fullName", "account", "John Doe", "default", formikProps)}
            
            {renderInput("Email Address", "email", "email", "john.doe@sait.ca", "email-address", formikProps)}
            
            {renderInput("Employee ID", "employeeId", "badge-account", "EMP-1234", "default", formikProps)}
            
            {renderInput("Phone Number", "phoneNumber", "phone", "4031234567", "numeric", formikProps)}
            
            {renderInput("Department", "department", "briefcase", "IT / Engineering", "default", formikProps)}

            <TouchableOpacity
              style={[
                styles.submitButton,
                !formikProps.isValid || formikProps.isSubmitting ? styles.submitButtonDisabled : null,
              ]}
              onPress={() => formikProps.handleSubmit()}
              disabled={!formikProps.isValid || formikProps.isSubmitting}
            >
              {formikProps.isSubmitting ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.submitButtonText}>Register Employee</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => formikProps.resetForm()}
            >
              <Text style={styles.resetButtonText}>Reset Form</Text>
            </TouchableOpacity>
          </ScrollView>
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
    maxHeight: '80%',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: "#111827",
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