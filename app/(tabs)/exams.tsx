import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons

const exams = [
  {
    id: '1',
    type: 'Minor 1',
    subject: 'Mathematics',
    icon: 'calculate',
    instructor: 'Dr. John Doe',
    instructorIcon: 'person',
    instructorIcon2: 'type-specimen',
    year: '2nd',
    yearIcon: 'school',
    branch: 'CSE',
    branchIcon: 'category',
    date: '2025-01-10',
    dateIcon: 'calendar-today',
    totalMarks: 100,
    marksIcon: 'assignment',
  },
  {
    id: '2',
    type: 'Mid-term',
    subject: 'Physics',
    icon: 'science',
    instructor: 'Dr. Jane Smith',
    instructorIcon: 'person',
    instructorIcon2: 'type-specimen',
    year: '1st',
    yearIcon: 'school',
    branch: 'ECE',
    branchIcon: 'category',
    date: '2025-01-12',
    dateIcon: 'calendar-today',
    totalMarks: 75,
    marksIcon: 'assignment',
  },
  {
    id: '3',
    type: 'Mid-term',
    subject: 'Data Structures',
    icon: 'memory',
    instructor: 'Prof. Alan Turing',
    instructorIcon: 'person',
    instructorIcon2: 'type-specimen',
    year: '2nd',
    yearIcon: 'school',
    branch: 'CSE',
    branchIcon: 'category',
    date: '2025-01-15',
    dateIcon: 'calendar-today',
    totalMarks: 80,
    marksIcon: 'assignment',
  },
  {
    id: '4',
    type: 'Minor 2',
    subject: 'Chemistry',
    icon: 'biotech',
    instructor: 'Dr. Marie Curie',
    instructorIcon: 'person',
    instructorIcon2: 'type-specimen',
    year: '1st',
    yearIcon: 'school',
    branch: 'ME',
    branchIcon: 'category',
    date: '2025-01-18',
    dateIcon: 'calendar-today',
    totalMarks: 70,
    marksIcon: 'assignment',
  },
  {
    id: '5',
    type: 'quiz',
    subject: 'Operating Systems',
    icon: 'developer-board',
    instructor: 'Prof. Dennis Ritchie',
    instructorIcon: 'person',
    instructorIcon2: 'type-specimen',
    year: '3rd',
    yearIcon: 'school',
    branch: 'CSE',
    branchIcon: 'category',
    date: '2025-01-20',
    dateIcon: 'calendar-today',
    totalMarks: 100,
    marksIcon: 'assignment',
  },
];

export default function Exam() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
     <View style={[styles.container, darkMode && styles.containerDark]}>
      <Text style={[styles.header, darkMode && styles.textDark]}>Upcoming Exams</Text>
      <View style={styles.switchCenterContainer}>
        <Text style={[styles.switchLabel, darkMode && styles.textDark]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
        
      </View>
      <FlatList
        data={exams}
        renderItem={({ item }) => (
          <View style={[styles.card, darkMode && styles.cardDark]}>
            
            <View style={styles.subjectRow}>
              <Icon name={item.icon} size={24} color={darkMode ? '#f5f5f5' : '#444'} />
              <Text style={[styles.cardTitle, darkMode && styles.textDark]}>{item.subject}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Icon name={item.instructorIcon2} size={20} color={darkMode ? '#f5f5f5' : '#444'} />
              <Text style={[styles.cardDetail, darkMode && styles.textDark, styles.detailsText]}>Type: {item.type}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Icon name={item.instructorIcon} size={20} color={darkMode ? '#f5f5f5' : '#444'} />
              <Text style={[styles.cardDetail, darkMode && styles.textDark, styles.detailsText]}>Instructor: {item.instructor}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Icon name={item.yearIcon} size={20} color={darkMode ? '#f5f5f5' : '#444'} />
              <Text style={[styles.cardDetail, darkMode && styles.textDark, styles.detailsText]}>Year: {item.year}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Icon name={item.branchIcon} size={20} color={darkMode ? '#f5f5f5' : '#444'} />
              <Text style={[styles.cardDetail, darkMode && styles.textDark, styles.detailsText]}>Branch: {item.branch}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Icon name={item.dateIcon} size={20} color={darkMode ? '#f5f5f5' : '#444'} />
              <Text style={[styles.cardDetail, darkMode && styles.textDark, styles.detailsText]}>Date: {item.date}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Icon name={item.marksIcon} size={20} color={darkMode ? '#f5f5f5' : '#444'} />
              <Text style={[styles.cardDetail, darkMode && styles.textDark, styles.detailsText]}>Total Marks: {item.totalMarks}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
        <Text style={styles.footer}>© {new Date().getFullYear()} Callmekvj. All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  textDark: {
    color: '#f5f5f5',
  },
  switchCenterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
    marginLeft: 10, // This adds spacing between the icon and text  
  },
  cardDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  footer: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff', // White text color for contrast
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#1e1e1e', // Dark heading background
  },
  detailsText: {
    marginLeft: 10, // This adds spacing between the icon and text
  },
});
