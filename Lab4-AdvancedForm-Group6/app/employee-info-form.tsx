import { ScrollView, StyleSheet, Text } from 'react-native';
import EmployeeForm from '../components/EmployeeForm';

export default function EmployeeInfoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Employee Registration</Text>
      <EmployeeForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff', paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }
});