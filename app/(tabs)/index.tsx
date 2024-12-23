import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentClass, setCurrentClass] = useState(null);
  const [nextClass, setNextClass] = useState(null);


  type Year = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
  type Branch = 'CSE' | 'AIDS' | 'MnC' | 'OtherBranches'; // Add your branches here


  interface ClassDetails {
    subject: string;
    time: string;
    instructor: string;
    classroom: string;
  }

  interface Timetable {
    '1st Year': { [key: string]: ClassDetails[] };
    '2nd Year': { [key: string]: ClassDetails[] };
    '3rd Year': { [key: string]: ClassDetails[] };
    '4th Year': { [key: string]: ClassDetails[] };
  }

  const timetableData: Timetable = {
    '1st Year': {
      CSE: [
        { subject: 'Introduction to Programming', time: '9:00 AM', instructor: 'Dr. Sharma', classroom: '101' },
        { subject: 'Engineering Mathematics I', time: '10:30 AM', instructor: 'Dr. Verma', classroom: '102' },
        { subject: 'Physics for Engineers', time: '12:00 PM', instructor: 'Dr. Gupta', classroom: '103' },
        { subject: 'Environmental Science', time: '1:00 PM', instructor: 'Dr. Das', classroom: '104' },
        { subject: 'Basic Electrical Engineering', time: '3:00 PM', instructor: 'Dr. Nair', classroom: '105' },
        { subject: 'Introduction to Mechanical Engineering', time: '4:30 PM', instructor: 'Dr. Bose', classroom: '106' },
      ],
      AIDS: [
        { subject: 'Introduction to Programming', time: '9:00 AM', instructor: 'Dr. Mehra', classroom: '201' },
        { subject: 'Data Science Fundamentals', time: '10:30 AM', instructor: 'Dr. Kapoor', classroom: '202' },
        { subject: 'Discrete Mathematics', time: '12:00 PM', instructor: 'Dr. Singh', classroom: '203' },
        { subject: 'Engineering Chemistry', time: '1:00 PM', instructor: 'Dr. Reddy', classroom: '204' },
        { subject: 'Principles of AI', time: '3:00 PM', instructor: 'Dr. Chaturvedi', classroom: '205' },
        { subject: 'Digital Logic Design', time: '4:30 PM', instructor: 'Dr. Banerjee', classroom: '206' },
      ],
      MnC: [
        { subject: 'Programming in Python', time: '9:00 AM', instructor: 'Dr. Mehra', classroom: '201' },
        { subject: 'Linear Algebra', time: '10:30 AM', instructor: 'Dr. Kapoor', classroom: '202' },
        { subject: 'Probability and Statistics', time: '12:00 PM', instructor: 'Dr. Kumar', classroom: '203' },
        { subject: 'Graph Theory', time: '1:00 PM', instructor: 'Dr. Ramesh', classroom: '204' },
        { subject: 'Optimization Techniques', time: '3:00 PM', instructor: 'Dr. Ghosh', classroom: '205' },
        { subject: 'Numerical Methods', time: '4:30 PM', instructor: 'Dr. Pillai', classroom: '206' },
      ],
    },
    '2nd Year': {
      CSE: [
        { subject: 'Data Structures and Algorithms', time: '9:00 AM', instructor: 'Dr. Iyer', classroom: '101' },
        { subject: 'Operating Systems', time: '10:30 AM', instructor: 'Dr. Khan', classroom: '102' },
        { subject: 'Database Management Systems', time: '12:00 PM', instructor: 'Dr. Patel', classroom: '103' },
        { subject: 'Computer Networks', time: '1:00 PM', instructor: 'Dr. Rao', classroom: '104' },
        { subject: 'Software Engineering', time: '3:00 PM', instructor: 'Dr. Jain', classroom: '105' },
        { subject: 'Artificial Intelligence', time: '4:30 PM', instructor: 'Dr. Mishra', classroom: '106' },
      ],
      AIDS: [
        { subject: 'Data Structures', time: '9:00 AM', instructor: 'Dr. Reddy', classroom: '201' },
        { subject: 'Machine Learning', time: '10:30 AM', instructor: 'Dr. Kapoor', classroom: '202' },
        { subject: 'Natural Language Processing', time: '12:00 PM', instructor: 'Dr. Banerjee', classroom: '203' },
        { subject: 'Big Data Analytics', time: '1:00 PM', instructor: 'Dr. Das', classroom: '204' },
        { subject: 'Cloud Computing', time: '3:00 PM', instructor: 'Dr. Chaturvedi', classroom: '205' },
        { subject: 'Deep Learning', time: '4:30 PM', instructor: 'Dr. Bose', classroom: '206' },
      ],
    },
    '3rd Year': {
      CSE: [
        { subject: 'Advanced Algorithms', time: '9:00 AM', instructor: 'Dr. Iyer', classroom: '101' },
        { subject: 'Compiler Design', time: '10:30 AM', instructor: 'Dr. Khan', classroom: '102' },
        { subject: 'Distributed Systems', time: '12:00 PM', instructor: 'Dr. Rao', classroom: '103' },
        { subject: 'Cybersecurity', time: '1:00 PM', instructor: 'Dr. Patel', classroom: '104' },
        { subject: 'Mobile Computing', time: '3:00 PM', instructor: 'Dr. Mishra', classroom: '105' },
        { subject: 'IoT Systems', time: '4:30 PM', instructor: 'Dr. Jain', classroom: '106' },
      ],
    },
    '4th Year': {
      CSE: [
        { subject: 'Machine Learning', time: '9:00 AM', instructor: 'Dr. Kapoor', classroom: '101' },
        { subject: 'Blockchain Technology', time: '10:30 AM', instructor: 'Dr. Banerjee', classroom: '102' },
        { subject: 'Robotics', time: '12:00 PM', instructor: 'Dr. Gupta', classroom: '103' },
        { subject: 'Augmented Reality', time: '1:00 PM', instructor: 'Dr. Nair', classroom: '104' },
        { subject: 'Quantum Computing', time: '3:00 PM', instructor: 'Dr. Bose', classroom: '105' },
        { subject: 'Capstone Project', time: '4:30 PM', instructor: 'Dr. Sharma', classroom: '106' },
      ],
    },
  };

  const getTimeInMinutes = (timeString: string) => {
    const [hourMinute, period] = timeString.split(' ');
    const [hours, minutes] = hourMinute.split(':').map(Number);
    const periodAdjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : hours;
    const adjustedHours = period === 'AM' && hours === 12 ? 0 : periodAdjustedHours;
    return adjustedHours * 60 + minutes;
  };

  const getStatus = () => {

    const dayOfWeek = currentTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const timeInMinutes = hour * 60 + minute;

    // Vacation (Example date range)
    const checkVacation = (currentTime: number | Date) => {
      const vacationStart = new Date('2025-12-25');
      const vacationEnd = new Date('2025-12-31');
      return currentTime >= vacationStart && currentTime <= vacationEnd;
    };
    if (checkVacation(currentTime)) {
      return 'Vacation';
    }

    // Holidays (Saturday and Sunday)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return 'Holiday';
    }

    // Break (1:00 PM to 2:30 PM)
    if (timeInMinutes >= getTimeInMinutes('1:00 PM') && timeInMinutes <= getTimeInMinutes('2:30 PM')) {
      return 'Break';
    }

    // In-class (Mon-Fri except break timing)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const todayClasses = timetableData[year]?.[branch] || [];
      for (const classData of todayClasses) {
        const classStartTime = getTimeInMinutes(classData.time);
        const classEndTime = classStartTime + 60; // Assuming each class lasts 1 hour
        if (timeInMinutes >= classStartTime && timeInMinutes < classEndTime) {
          return 'In-class';
        }
      }
    }

    // Day off (Mon-Fri except 9 AM to 5:30 PM)
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && (timeInMinutes < getTimeInMinutes('9:00 AM') || timeInMinutes >= getTimeInMinutes('5:30 PM'))) {
      return 'Day Off';
    }

    // Get ready (Sun-Thurs from 9 PM to next day 9 AM)
    if ((dayOfWeek >= 0 && dayOfWeek <= 3 && timeInMinutes >= getTimeInMinutes('9:00 PM')) ||
      (dayOfWeek === 4 && timeInMinutes < getTimeInMinutes('9:00 AM'))) {
      return 'Get Ready';
    }

    return 'Outside defined time';
  };
  const updateCurrentAndNextClass = () => {
    const todayClasses = timetableData[year as keyof typeof timetableData]?.[branch as keyof (typeof timetableData)[keyof typeof timetableData]] || [];
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    let current = null;
    let next = null;

    todayClasses.forEach((classData) => {
      const classStartTime = getTimeInMinutes(classData.time);
      if (classStartTime <= currentMinutes) {
        current = classData;
      } else if (!next) {
        next = classData;
      }
    });

    setCurrentClass(current);
    setNextClass(next);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (submitted) {
        updateCurrentAndNextClass();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted]);

  // Call getStatus to update the status
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (submitted) {
      const statusText = getStatus();
      setStatus(statusText);
    }
  }, [currentTime, submitted]);


  const handleBack = () => {
    setSubmitted(false);
    setName('');
    setYear('');
    setBranch('');
  };

  const handleSubmit = () => {
    if (!name || !year || !branch) {
      alert('All fields are required!');
      return;
    }
    setSubmitted(true);
    updateCurrentAndNextClass();
  };

  if (!submitted) {
    return (
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
        }}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Welcome to Indian Institute of Information Technology, Raichur</Text>
          <Text style={styles.heading2}>Enter Your Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <Picker
            selectedValue={year}
            style={styles.picker}
            onValueChange={setYear}
          >
            <Picker.Item label="Select Year" value="" />
            <Picker.Item label="1st Year" value="1st Year" />
            <Picker.Item label="2nd Year" value="2nd Year" />
            <Picker.Item label="3rd Year" value="3rd Year" />
            <Picker.Item label="4th Year" value="4th Year" />
          </Picker>
          <Picker
            selectedValue={branch}
            style={styles.picker}
            onValueChange={setBranch}
          >
            <Picker.Item label="Select Branch" value="" />
            <Picker.Item label="CSE" value="CSE" />
            <Picker.Item label="AIDS" value="AIDS" />
            <Picker.Item label="MnC" value="MnC" />
          </Picker>
          <Button title="Submit" onPress={handleSubmit} />


        </View>
        <Text style={styles.footer}>© {new Date().getFullYear()} Callmekvj. All rights reserved.</Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      }}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome, {name}!</Text>
            <Text style={styles.cardText}>Year: {year} | Branch: {branch}</Text>
            <Text style={styles.cardText}>
              {currentTime.toLocaleDateString()} | {currentTime.toLocaleTimeString()}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Current Class</Text>
            {currentClass ? (
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>Subject: {currentClass.subject}</Text>
                <Text style={styles.infoText}>Instructor: {currentClass.instructor}</Text>
                <Text style={styles.infoText}>Classroom: {currentClass.classroom}</Text>
              </View>
            ) : (
              <Text style={styles.infoText}>No ongoing class</Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Upcoming Class</Text>
            {nextClass ? (
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>Subject: {nextClass.subject}</Text>
                <Text style={styles.infoText}>Instructor: {nextClass.instructor}</Text>
                <Text style={styles.infoText}>Classroom: {nextClass.classroom}</Text>
              </View>
            ) : (
              <Text style={styles.infoText}>No upcoming class</Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Current Status</Text>
            <Text style={styles.infoText}>{status}</Text>
          </View>

          <View style={styles.card}>
            <Button title="Go Back" onPress={handleBack} />
          </View>

        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background color for the container
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(40, 40, 40, 0.9)', // Semi-transparent dark background
    padding: 20,

  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#ffffff', // White text color for contrast
    textAlign: 'center',
    backgroundColor: '#1e1e1e', // Dark heading background
    padding: 10,
    borderRadius: 10,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#ffffff', // White text color for contrast
    textAlign: 'center',
    padding: 10,
    paddingTop: 20,

  },
  footer: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff', // White text color for contrast
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#1e1e1e', // Dark heading background
  },
  input: {
    width: '90%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white', // Dark input background
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333333', // Darker border
    color: 'black', // White text color for input text
  },
  picker: {
    width: '90%',
    marginBottom: 10,
    backgroundColor: '#1e1e1e', // Dark picker background
    borderStyle: 'solid',
    borderRadius: 15,
    color: 'white', // White text color
  },
  cardContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: '#1e1e1e', // Dark card background
    borderRadius: 10,
    padding: 20,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#ffffff', // White text color for card title
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#bbbbbb', // Light gray for card text
  },
  infoBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#1e1e1e', // Dark background for info box
    borderRadius: 5,
    borderColor: '#333333',
    borderWidth: 1,
  },
  infoText: {
    fontSize: 16,
    color: '#ffffff', // White text color
  },
});

export default App;
