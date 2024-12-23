import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Install expo/vector-icons if not already installed

export default function AboutDeveloper() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('./harsha.png')} // Replace with actual image URL
          style={styles.profileImage}
        />
        <Text style={styles.name}>K V Jaya Harsha</Text>
        <Text style={styles.description}>
          A passionate tech enthusiast. Exploring the world and learning every day.
        </Text>

        <View style={styles.skillsContainer}>
          {['Project Lead', 'Full Stack Developer','React','React Native','HTML', 'CSS', 'JavaScript',  'Next.js', 'Node.js', 'UI/UX', 'Mongo DB', 'Firebase', 'Python'].map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Kvj-Harsha')}>
            <FontAwesome name="github" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/in/kvjharsha')}>
            <FontAwesome name="linkedin" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:cs23b1034@iiitr.ac.in')}>
            <FontAwesome name="envelope" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* GitHub project button */}
        <TouchableOpacity
          style={styles.projectButton}
          onPress={() => Linking.openURL('https://github.com/Kvj-Harsha/synk')} // Replace with your project URL
        >
          <Text style={styles.projectButtonText}>See this project on GitHub</Text>
        </TouchableOpacity>
        <Text style={styles.projectButtonText2}>Give it a star ⭐</Text>
      </View>

      <Text style={styles.footer}>© {new Date().getFullYear()} Callmekvj. All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
    justifyContent: 'space-between', // Push the footer to the bottom
  },
  content: {
    flex: 1, // Take up available space
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
  },
  footer: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff', // White text color for contrast
    textAlign: 'center',
    padding: 10,
    marginBottom: 0, // Add bottom margin for better spacing
  },
  profileImage: {
    width: 150,
    height: 150,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 90,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  skillBadge: {
    backgroundColor: '#1E293B',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 5,
  },
  skillText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20, // Add margin for better spacing between icons and buttons
  },
  icon: {
    marginHorizontal: 10,
  },
  projectButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  projectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectButtonText2: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 10,
  },
});
