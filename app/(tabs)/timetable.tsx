import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Switch,
} from 'react-native';

interface TimetableEntry {
  time: string;
  subject: string;
  instructor: string;
}

interface YearTimetable {
  CSE: TimetableEntry[];
  AIDS: TimetableEntry[];
  MNC: TimetableEntry[];
}

interface TimetableData {
  "1st Year": YearTimetable;
  "2nd Year": YearTimetable;
  "3rd Year": YearTimetable;
  "4th Year": YearTimetable;
}

const curriculumData = {
  "2nd Year CS": [
    { "sno": 1, courseName: "Design and Analysis of Algorithms", code: "CS251", credits: 3, instructor: "Dr. Priodyuti Pradhan", slotPreference: "P/Q/R", remarks: "Please keep CSE and AI & DS in same slot in the time table" },
    { "sno": 2, courseName: "Operating Systems Theory/Operating Systems Lab", code: "CS221/CS222", credits: "3+1", instructor: "Dr. Natesh B V", slotPreference: "B", remarks: "" },
    { "sno": 3, courseName: "Compiler and Programming Language", code: "CS232", credits: 3, instructor: "Dr. Ramesh K. Jallu", slotPreference: "", remarks: "" },
    { "sno": 4, courseName: "DBMS", code: "CS261", credits: 3, instructor: "Dr Anup Kumar Halder", slotPreference: "Q", remarks: "" },
    { "sno": 5, courseName: "Engineering Elective: Computational Optimization Methods and Algorithms - I", code: "IDxxx", credits: 3, instructor: "Dr Bharat Soni", slotPreference: "", remarks: "Prerequisites: Mathematics-I, Mathematics-II, Programming" },
    { "sno": 6, courseName: "LA Electives", code: "LAxxx", credits: 2, instructor: "Prof. HKS", slotPreference: "", remarks: "" },
    { "sno": 7, courseName: "LA Electives: TISIT-2", code: "", credits: 2, instructor: "Will be handled by SVYM", slotPreference: "", remarks: "TISIT-1 is mandatory" },
    { "sno": 8, courseName: "Total", code: "", credits: 18, instructor: "", slotPreference: "", remarks: "" }
  ],
  "2nd Year AIDS": [
    { sno: 1, courseName: 'Design and Analysis of Algorithms', code: 'CS251', credits: 3, instructor: 'Dr. Priodyuti Pradhan', slotPreference: 'P/Q/R', remarks: 'Please keep CSE and AI & DS in same slot in the timetable' },
    { sno: 2, courseName: 'Operating Systems', code: 'CSXXX', credits: 3, instructor: 'Dr.Natesh B V', slotPreference: 'P', remarks: '' },
    { sno: 3, courseName: 'Data Warehousing and Data Mining', code: 'ADXXX', credits: 3, instructor: 'Dr. Dubacharla Gyaneshwar', slotPreference: '', remarks: '' },
    { sno: 4, courseName: 'DBMS', code: 'CS261', credits: 3, instructor: 'Dr Anup Kumar Halder', slotPreference: 'Q', remarks: '' },
    { sno: 5, courseName: 'Engineering Elective: Computational Optimization Methods and Algorithms - I', code: 'IDxxx', credits: 3, instructor: 'Dr Bharat Soni', slotPreference: '', remarks: 'Prerequisites: Mathematics-I, Mathematics-II, Programming' },
    { sno: 6, courseName: 'LA Elective', code: 'LAxxx', credits: 2, instructor: 'Prof. HKS', slotPreference: '', remarks: '' },
    { sno: 7, courseName: 'LA Elective: TISIT-3', code: '', credits: 2, instructor: 'Will be handled by SVYM', slotPreference: '', remarks: '' },
    { sno: 8, courseName: 'Linear Algebra and Matrix Theory', code: 'MAXXX', credits: 3, instructor: 'Dr Alka', slotPreference: '', remarks: '' },
    { sno: 9, courseName: 'Total', code: '', credits: 22, instructor: '', slotPreference: '', remarks: '' }
  ],
  "3rd Year CSE": [
    { sno: 1, courseName: 'Mini Project 1', code: 'CS391', credits: 3, instructor: 'NA', slotPreference: '', remarks: 'Regarding Faculty selection will mention it shortly' },
    { sno: 2, courseName: 'CS Elective 3: Introduction to Generative AI', code: 'CSxxx', credits: 3, instructor: 'Dr. Priodyuti Pradhan', slotPreference: 'P/Q/R', remarks: 'Prerequisites: Data Structures (CS201), Design and Analysis of Algorithms (CS251), and Foundations of Machine Learning (CS311)' },
    { sno: 3, courseName: 'CS Elective 3: Deep learning for Speech Processing', code: 'CSxxx', credits: 3, instructor: 'Dr. Kiran', slotPreference: 'S', remarks: 'Prerequisites: Basics of Probability, Random Process, Linear Algebra, and Machine Learning' },
    { sno: 4, courseName: 'CS Elective 4: Soft Computing and Evolutionary AI', code: 'CSxxx', credits: 3, instructor: 'Dr Anup Kumar Halder', slotPreference: 'F', remarks: 'Prerequisites: Strong mathematical background, Proficiency with algorithms.' },
    { sno: 5, courseName: 'CS Elective 4: Computer Vision', code: 'CSxxx', credits: 3, instructor: 'Dr. Dubacharla Gyaneshwar', slotPreference: 'G', remarks: 'Prerequisites: Linear algebra, calculus, probability, statistics, and programming' },
    { sno: 6, courseName: 'CS Elective 4: Embedded System', code: '', credits: 3, instructor: 'Dr. Jahnvi Tiwari', slotPreference: 'P', remarks: 'None' },
    { sno: 7, courseName: 'Free Elective 2: Analytic Number Theory', code: 'XXxxx', credits: 3, instructor: 'Dr. Nabin', slotPreference: '', remarks: '' },
    { sno: 8, courseName: 'Free Elective 2: Algebra-I (Group and Ring Theory)', code: '', credits: 3, instructor: '', slotPreference: '', remarks: '' },
    { sno: 9, courseName: 'Free Elective 2: Math tools for Data Science and ML', code: '', credits: 3, instructor: 'Dr Alka', slotPreference: '', remarks: '' },
    { sno: 10, courseName: 'Science Elective', code: 'XXxxx', credits: 1, instructor: '', slotPreference: '', remarks: '' },
    { sno: 11, courseName: 'Total', code: '', credits: 13, instructor: '', slotPreference: '', remarks: '' }
  ],
  "4th Year CSE": [
    { sno: 1, courseName: 'Major Project', code: 'CS492', credits: 9, instructor: '', slotPreference: '', remarks: '' },
    { sno: 2, courseName: 'Total', code: '', credits: 9, instructor: '', slotPreference: '', remarks: '' }
  ]
};

const CurriculumSection = ({ curriculumData }) => {
  // Check if curriculumData is valid
  if (!curriculumData || Object.keys(curriculumData).length === 0) {
    return <Text>No curriculum data availa9   ble.</Text>;
  }

  const [expandedYear, setExpandedYear] = useState(null);

  const toggleYear = (year: string | null) => {
    setExpandedYear((prevYear) => (prevYear === year ? null : year));
  };

return (
    <View style={styles.section}>
      <Text style={styles.header}>Curriculum</Text>
      <ScrollView style={styles.curriculumContainer}>
        {Object.keys(curriculumData).map((year) => {
          const courses = curriculumData[year]; // Get the courses for each year

          return (
            <View key={year} style={styles.yearSection}>
              <TouchableOpacity onPress={() => toggleYear(year)}>
                <Text style={styles.yearHeader}>
                  {year}
                  {expandedYear === year ? ' ▼' : ' ►'}
                </Text>
              </TouchableOpacity>

              {expandedYear === year && (
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>S.No.</Text>
                  <Text style={styles.tableHeaderText}>Course Name</Text>
                  <Text style={styles.tableHeaderText}>Code</Text>
                  <Text style={styles.tableHeaderText}>Credits</Text>
                  <Text style={styles.tableHeaderText}>Instructor</Text>
                  <Text style={styles.tableHeaderText}>Slot Preference</Text>
                  <Text style={styles.tableHeaderText}>Remarks</Text>
                </View>
              )}

              {expandedYear === year &&
                courses.map((item: { sno: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; courseName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; code: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; credits: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; instructor: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; slotPreference: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; remarks: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableRowText}>{item.sno}</Text>
                    <Text style={styles.tableRowText}>{item.courseName}</Text>
                    <Text style={styles.tableRowText}>{item.code}</Text>
                    <Text style={styles.tableRowText}>{item.credits}</Text>
                    <Text style={styles.tableRowText}>{item.instructor}</Text>
                    <Text style={styles.tableRowText}>{item.slotPreference}</Text>
                    <Text style={styles.tableRowText}>{item.remarks}</Text>
                  </View>
                ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};


const timetableData: TimetableData = {
  "1st Year": {
    CSE: [
      { time: '9:00 AM', subject: 'Mathematics', instructor: 'Dr. Smith' },
      { time: '10:00 AM', subject: 'Physics', instructor: 'Prof. Johnson' },
      { time: '11:00 AM', subject: 'Chemistry', instructor: 'Dr. Lee' },
      { time: '12:00 PM', subject: 'Computer Science', instructor: 'Prof. Kim' },
      { time: '2:00 PM', subject: 'English', instructor: 'Ms. Clark' },
      { time: '3:00 PM', subject: 'Workshop', instructor: 'Dr. Moore' },
      { time: '4:00 PM', subject: 'Lab', instructor: 'Prof. Davis' },
    ],
    AIDS: [
      { time: '9:00 AM', subject: 'Mathematics', instructor: 'Dr. Smith' },
      { time: '10:00 AM', subject: 'Physics', instructor: 'Prof. Johnson' },
      { time: '11:00 AM', subject: 'Chemistry', instructor: 'Dr. Lee' },
      { time: '12:00 PM', subject: 'Computer Science', instructor: 'Prof. Kim' },
      { time: '2:00 PM', subject: 'English', instructor: 'Ms. Clark' },
      { time: '3:00 PM', subject: 'Workshop', instructor: 'Dr. Moore' },
      { time: '4:00 PM', subject: 'Lab', instructor: 'Prof. Davis' },
    ],
    MNC: [
      { time: '9:00 AM', subject: 'Mathematics', instructor: 'Dr. Smith' },
      { time: '10:00 AM', subject: 'Physics', instructor: 'Prof. Johnson' },
      { time: '11:00 AM', subject: 'Chemistry', instructor: 'Dr. Lee' },
      { time: '12:00 PM', subject: 'Computer Science', instructor: 'Prof. Kim' },
      { time: '2:00 PM', subject: 'English', instructor: 'Ms. Clark' },
      { time: '3:00 PM', subject: 'Workshop', instructor: 'Dr. Moore' },
      { time: '4:00 PM', subject: 'Lab', instructor: 'Prof. Davis' },
    ]
  },
  "2nd Year": {
    CSE: [
      { time: '9:00 AM', subject: 'Data Structures', instructor: 'Dr. Thompson' },
      { time: '10:00 AM', subject: 'Discrete Mathematics', instructor: 'Prof. Jackson' },
      { time: '11:00 AM', subject: 'Algorithms', instructor: 'Dr. White' },
      { time: '12:00 PM', subject: 'Database Systems', instructor: 'Prof. Harris' },
      { time: '2:00 PM', subject: 'Operating Systems', instructor: 'Ms. Taylor' },
      { time: '3:00 PM', subject: 'Software Engineering', instructor: 'Dr. Wilson' },
      { time: '4:00 PM', subject: 'Computer Networks', instructor: 'Prof. Martin' },
    ],
    AIDS: [
      { time: '9:00 AM', subject: 'Data Structures', instructor: 'Dr. Thompson' },
      { time: '10:00 AM', subject: 'Discrete Mathematics', instructor: 'Prof. Jackson' },
      { time: '11:00 AM', subject: 'Algorithms', instructor: 'Dr. White' },
      { time: '12:00 PM', subject: 'Database Systems', instructor: 'Prof. Harris' },
      { time: '2:00 PM', subject: 'Operating Systems', instructor: 'Ms. Taylor' },
      { time: '3:00 PM', subject: 'Software Engineering', instructor: 'Dr. Wilson' },
      { time: '4:00 PM', subject: 'Computer Networks', instructor: 'Prof. Martin' },
    ]
  },
  "3rd Year": {
    CSE: [
      { time: '9:00 AM', subject: 'Computer Architecture', instructor: 'Prof. Clark' },
      { time: '10:00 AM', subject: 'Advanced Data Structures', instructor: 'Dr. Green' },
      { time: '11:00 AM', subject: 'Artificial Intelligence', instructor: 'Prof. Brown' },
      { time: '12:00 PM', subject: 'Web Technologies', instructor: 'Ms. Adams' },
      { time: '2:00 PM', subject: 'Cloud Computing', instructor: 'Dr. Lewis' },
      { time: '3:00 PM', subject: 'Database Design', instructor: 'Prof. Carter' },
      { time: '4:00 PM', subject: 'Computer Graphics', instructor: 'Dr. Walker' },
    ]
  },
  "4th Year": {
    CSE: [
      { time: '9:00 AM', subject: 'Machine Learning', instructor: 'Prof. Clark' },
      { time: '10:00 AM', subject: 'Distributed Systems', instructor: 'Dr. Green' },
      { time: '11:00 AM', subject: 'Cybersecurity', instructor: 'Prof. Brown' },
      { time: '12:00 PM', subject: 'Big Data', instructor: 'Ms. Adams' },
      { time: '2:00 PM', subject: 'Software Testing', instructor: 'Dr. Lewis' },
      { time: '3:00 PM', subject: 'Cloud Security', instructor: 'Prof. Carter' },
      { time: '4:00 PM', subject: 'Artificial Intelligence', instructor: 'Dr. Walker' },
    ]
  }
};


const TimetableScreen = ({ year, department, darkMode }: { year: string; department: string; darkMode: boolean }) => {
  const timetable = timetableData[year as keyof TimetableData]?.[department as keyof YearTimetable];

  return (
    <View style={[styles.timetableBox, darkMode && styles.darkBox]}>
      {timetable?.map((item, index) => (
        <View key={index} style={styles.timetableRow}>
          <View style={styles.timeColumn}>
            <Text style={[styles.timeText, darkMode && styles.darkText]}>{item.time}</Text>
          </View>
          <View style={styles.subjectAndInstructor}>
            <Text style={[styles.subjectText, darkMode && styles.darkText]}>{item.subject}</Text>
            <Text style={[styles.instructorText, darkMode && styles.darkText]}>{item.instructor}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default function Timetable() {
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({
    "1st Year": false,
    "2nd Year": false,
    "3rd Year": false,
    "4th Year": false,
  });
  const [darkMode, setDarkMode] = useState(false);

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <ImageBackground
      source={require('./bg.jpg')} // Replace with the actual path to your image
      style={[styles.backgroundImage, darkMode && styles.darkBackground]}
    >
      <ScrollView style={styles.container}>
        <View style={styles.overlay}>
          <Text style={[styles.headerText, darkMode && styles.darkText]}>Timetable</Text>
          <View style={styles.darkModeToggle}>
            <Text style={[styles.darkModeText, darkMode && styles.darkText]}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
          {Object.keys(timetableData).map((year) => (
            <View key={year} style={styles.yearSection}>
              <TouchableOpacity onPress={() => toggleYear(year)} style={styles.yearHeader}>
                <Text style={[styles.yearText, darkMode && styles.darkText]}>{year}</Text>
              </TouchableOpacity>
              {expandedYears[year] && (
                <View style={styles.expandedContent}>
                  {["CSE", "AIDS", "MNC"].map((dept) => (
                    <View key={dept} style={styles.departmentBox}>
                      <Text style={[styles.departmentText, darkMode && styles.darkText]}>{dept}</Text>
                      <TimetableScreen year={year} department={dept} darkMode={darkMode} />
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
        <CurriculumSection curriculumData={curriculumData} />
      </ScrollView>
      <Text style={styles.footer}>© {new Date().getFullYear()} Callmekvj. All rights reserved.</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  footer: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff', // White text color for contrast
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#1e1e1e', // Dark heading background
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  section: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  darkModeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  darkModeText: {
    color: '#fff',
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  curriculumContainer: {
    marginTop: 10,
    borderRadius: 8,
    padding: 10,
    color: 'white',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    width: '14%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableRowText: {
    fontSize: 12,
    color: 'white',
    width: '14%',
    textAlign: 'center',
  },
  yearSection: {
    marginBottom: 20,
    color: 'white',
  },
  yearHeader: {
    padding: 10,
    backgroundColor: '#495057',
    borderRadius: 6,
    marginBottom: 10,
    color: 'white',
  },
  yearText: {
    fontSize: 18,
    color: '#fff',
  },
  expandedContent: {
    paddingLeft: 20,
  },
  departmentBox: {
    marginBottom: 10,
  },
  departmentText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  timetableBox: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  timetableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingVertical: 10,
  },
  timeColumn: {
    width: '40%',
    paddingRight: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343a40',
    textAlign: 'right',
  },
  subjectAndInstructor: {
    width: '80%',
    paddingLeft: 10,
  },
  subjectText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  instructorText: {
    fontSize: 14,
    color: '#6c757d',
  },
  darkBox: {
    backgroundColor: '#333',
  },
  darkText: {
    color: '#fff',
  },
  darkBackground: {
    backgroundColor: '#222',
  },
});
