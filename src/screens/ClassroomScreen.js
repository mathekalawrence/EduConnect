import {
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useEdu } from '../context/EduContext';

const ClassroomScreen = () => {
  const { classrooms, announcements } = useEdu();

  const renderClassroom = ({ item }) => (
    <TouchableOpacity style={styles.classroomCard}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1497636577773-f1231844b336' }}
        style={styles.classroomBackground}
        imageStyle={{ borderRadius: 15 }}
      >
        
        <View style={styles.classroomOverlay}>
          <Text style={styles.classroomName}>{item.name}</Text>
          <Text style={styles.classroomTeacher}>{item.teacher}</Text>
          <Text style={styles.classroomSchedule}>{item.schedule}</Text>
          <View style={styles.studentsCount}>
            <Text style={styles.studentsText}>
              {item.students.length} students
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderAnnouncement = ({ item }) => (
    <View style={styles.announcementCard}>
      <Text style={styles.announcementTitle}>{item.title}</Text>
      <Text style={styles.announcementMessage}>{item.message}</Text>
      <View style={styles.announcementFooter}>
        <Text style={styles.announcementAuthor}>{item.author}</Text>
        <Text style={styles.announcementDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>My Classrooms</Text>
      <FlatList
        horizontal
        data={classrooms}
        renderItem={renderClassroom}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.classroomsList}
      />
      
      <Text style={styles.sectionTitle}>Announcements</Text>
      <FlatList
        data={announcements}
        renderItem={renderAnnouncement}
        keyExtractor={item => item.id}
        style={styles.announcementsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  classroomsList: {
    marginBottom: 20,
  },
  classroomCard: {
    width: 280,
    height: 160,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  classroomBackground: {
    flex: 1,
  },
  classroomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    padding: 15,
  },
  classroomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  classroomTeacher: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  classroomSchedule: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 10,
  },
  studentsCount: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  studentsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  announcementsList: {
    flex: 1,
  },
  announcementCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  announcementMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  announcementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  announcementAuthor: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  announcementDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default ClassroomScreen;