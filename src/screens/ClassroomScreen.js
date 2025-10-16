import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Layout/Card';
import EmptyState from '../components/Layout/EmptyState';
import Header from '../components/Layout/Header';
import { useEdu } from '../context/EduContext';

const ClassroomScreen = ({ navigation }) => {
  const { classrooms, announcements } = useEdu();

  const renderClassroom = ({ item }) => (
    <Card style={styles.classroomCard} elevation={3}>
      <TouchableOpacity style={styles.classroomContent}>
        <View style={styles.classroomHeader}>
          <View style={styles.subjectBadge}>
            <Text style={styles.subjectText}>Math</Text>
          </View>
          <Icon name="chevron-forward" size={20} color="#999" />
        </View>
        
        <Text style={styles.classroomName}>{item.name}</Text>
        <Text style={styles.classroomTeacher}>{item.teacher}</Text>
        
        <View style={styles.classroomDetails}>
          <View style={styles.detailItem}>
            <Icon name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.schedule}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.students.length} students</Text>
          </View>
        </View>

        <View style={styles.materialsSection}>
          <Text style={styles.materialsTitle}>Recent Materials</Text>
          {item.materials.slice(0, 2).map(material => (
            <View key={material.id} style={styles.materialItem}>
              <Icon 
                name={material.type === 'pdf' ? 'document-text' : 'document'} 
                size={16} 
                color="#4CAF50" 
              />
              <Text style={styles.materialName} numberOfLines={1}>
                {material.name}
              </Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </Card>
  );

  const renderAnnouncement = ({ item }) => (
    <Card style={styles.announcementCard} elevation={2}>
      <View style={styles.announcementHeader}>
        <View style={styles.announcementIcon}>
          <Icon name="megaphone" size={20} color="#4CAF50" />
        </View>
        <View style={styles.announcementInfo}>
          <Text style={styles.announcementTitle}>{item.title}</Text>
          <Text style={styles.announcementAuthor}>{item.author}</Text>
        </View>
        <Text style={styles.announcementDate}>{item.date}</Text>
      </View>
      <Text style={styles.announcementMessage}>{item.message}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header title="Classrooms" />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Classes</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {classrooms.length === 0 ? (
            <EmptyState
              icon="school-outline"
              title="No classrooms"
              message="You haven't been added to any classrooms yet"
            />
          ) : (
            <FlatList
              horizontal
              data={classrooms}
              renderItem={renderClassroom}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.classroomsList}
            />
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Announcements</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {announcements.length === 0 ? (
            <EmptyState
              icon="megaphone-outline"
              title="No announcements"
              message="Check back later for updates from your teachers"
              size="small"
            />
          ) : (
            <FlatList
              data={announcements}
              renderItem={renderAnnouncement}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
                <Icon name="calendar" size={24} color="#2196F3" />
              </View>
              <Text style={styles.actionText}>Schedule</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: '#E8F5E8' }]}>
                <Icon name="document-text" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.actionText}>Materials</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
                <Icon name="people" size={24} color="#FF9800" />
              </View>
              <Text style={styles.actionText}>Classmates</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
                <Icon name="videocam" size={24} color="#9C27B0" />
              </View>
              <Text style={styles.actionText}>Live Class</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    padding: 4,
  },
  seeAllText: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 14,
  },
  classroomsList: {
    paddingHorizontal: 12,
  },
  classroomCard: {
    width: 300,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  classroomContent: {
    padding: 16,
  },
  classroomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  subjectText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  classroomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  classroomTeacher: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  classroomDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  materialsSection: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  materialsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  materialName: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  announcementCard: {
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  announcementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  announcementInfo: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  announcementAuthor: {
    fontSize: 13,
    color: '#666',
  },
  announcementDate: {
    fontSize: 12,
    color: '#999',
  },
  announcementMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  quickActions: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default ClassroomScreen;