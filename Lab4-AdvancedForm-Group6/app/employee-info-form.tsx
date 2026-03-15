import { ScrollView, StyleSheet } from 'react-native';
import EmployeeForm from '../components/EmployeeForm';

export default function EmployeeInfoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <EmployeeForm/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff', paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }
});