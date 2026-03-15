import { MaterialCommunityIcons } from '@expo/vector-icons'; // Built into Expo
import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { employeeSchema } from '../schemas/employeeSchema';

const EmployeeForm = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <Formik
      initialValues={{ fullName: '', email: '', employeeId: '', phoneNumber: '', department: '' }}
      validationSchema={employeeSchema}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
        <View style={styles.formContainer}>
          
          {/* Example Input Field: Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <View style={[
            styles.inputWrapper, 
            focusedField === 'fullName' && styles.inputFocused, // Focus styling 
            touched.fullName && errors.fullName && styles.inputError // Error styling 
          ]}>
            <MaterialCommunityIcons name="account" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              onChangeText={handleChange('fullName')}
              onBlur={() => { handleBlur('fullName'); setFocusedField(null); }}
              onFocus={() => setFocusedField('fullName')}
              value={values.fullName}
            />
          </View>
          {touched.fullName && errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

          {/* You would repeat this pattern for Email, EmployeeID, Phone, and Department */}

          <TouchableOpacity 
            style={[styles.button, !(isValid && dirty) && styles.buttonDisabled]} 
            onPress={() => handleSubmit()}
            disabled={!(isValid && dirty)} // Prevent submission until valid 
          >
            <Text style={styles.buttonText}>Register Employee</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: { padding: 20 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, height: 50, marginBottom: 5 },
  inputFocused: { borderColor: '#007AFF', borderWidth: 2 }, // Focus state 
  inputError: { borderColor: '#FF3B30' }, // Error state 
  icon: { marginRight: 10 },
  input: { flex: 1, height: '100%' },
  errorText: { color: '#FF3B30', fontSize: 12, marginBottom: 15 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonDisabled: { backgroundColor: '#A2A2A2' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default EmployeeForm;