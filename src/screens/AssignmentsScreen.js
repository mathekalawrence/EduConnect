import { useState } from 'react';
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Layout/Button';
import Card from '../components/Layout/Card';
import EmptyState from '../components/Layout/EmptyState';
import Header from '../components/Layout/Header';
import { useAuth } from '../context/AuthContext';
import { useEdu } from '../context/EduContext';

const AssignmentsScreen = () => {
  const { assignments, addAssignment, submitAssignment } = useEdu();
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const isTeacher = user.role === 'teacher';

  const filteredAssignments = assignments.filter(assignment => {
    if (selectedTab === 'submitted') {
      return assignment.submissions.some(s => s.studentId === user.id);
    } else if (selectedTab === 'pending') {
      return !assignment.submissions.some(s => s.studentId === user.id);
    }
    return true;
  });

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.description && newAssignment.dueDate) {
      addAssignment({
        ...newAssignment,
        classroomId: '1'
      });
      setNewAssignment({ title: '', description: '', dueDate: '' });
      setModalVisible(false);
    }
  };

  const handleSubmitAssignment = (assignmentId) => {
    submitAssignment(assignmentId, {
      studentId: user.id,
      file: 'submission.pdf',
      submittedAt: new Date().toISOString().split('T')[0],
      grade: 'Pending'
    });
  };

  const getStatusColor = (assignment) => {
    const hasSubmitted = assignment.submissions.some(s => s.studentId === user.id);
    return hasSubmitted ? '#4CAF50' : '#FF9800';
  };

  const getStatusText = (assignment) => {
    const hasSubmitted = assignment.submissions.some(s => s.studentId === user.id);
    return hasSubmitted ? 'Submitted' : 'Pending';
  };

  const renderAssignment = ({ item }) => (
    <Card style={styles.assignmentCard} elevation={2}>
      <View style={styles.assignmentHeader}>
        <View style={styles.assignmentInfo}>
          <Text style={styles.assignmentTitle}>{item.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item) }]}>
            <Text style={styles.statusText}>{getStatusText(item)}</Text>
          </View>
        </View>
        <Text style={styles.dueDate}>
          Due: {item.dueDate}
        </Text>
      </View>
      
      <Text style={styles.assignmentDescription}>{item.description}</Text>
      
      <View style={styles.assignmentFooter}>
        <View style={styles.submissionInfo}>
          <Icon name="people" size={16} color="#666" />
          <Text style={styles.submissionText}>
            {item.submissions.length} submissions
          </Text>
        </View>
        
        {!isTeacher && !item.submissions.some(s => s.studentId === user.id) && (
          <Button
            title="Submit"
            variant="primary"
            size="small"
            onPress={() => handleSubmitAssignment(item.id)}
          />
        )}
      </View>

      {isTeacher && item.submissions.length > 0 && (
        <View style={styles.submissionsSection}>
          <Text style={styles.submissionsTitle}>Recent Submissions</Text>
          {item.submissions.slice(0, 2).map(submission => (
            <View key={submission.studentId} style={styles.submissionItem}>
              <Icon name="document" size={16} color="#4CAF50" />
              <Text style={styles.submissionText}>
                Student {submission.studentId} - {submission.grade}
              </Text>
            </View>
          ))}
          {item.submissions.length > 2 && (
            <Text style={styles.moreSubmissions}>
              +{item.submissions.length - 2} more
            </Text>
          )}
        </View>
      )}
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Assignments" 
        rightComponent={
          isTeacher ? (
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Icon name="add" size={24} color="white" />
            </TouchableOpacity>
          ) : null
        }
      />
      
      {!isTeacher && (
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'all', label: 'All Assignments' },
              { key: 'pending', label: 'Pending' },
              { key: 'submitted', label: 'Submitted' }
            ].map(tab => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  selectedTab === tab.key && styles.tabActive
                ]}
                onPress={() => setSelectedTab(tab.key)}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === tab.key && styles.tabTextActive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {filteredAssignments.length === 0 ? (
        <EmptyState
          icon="document-text-outline"
          title={isTeacher ? "No assignments created" : "No assignments"}
          message={
            isTeacher 
              ? "Create your first assignment for the class"
              : "You're all caught up! No assignments due right now"
          }
          actionTitle={isTeacher ? "Create Assignment" : null}
          action={isTeacher ? () => setModalVisible(true) : null}
        />
      ) : (
        <FlatList
          data={filteredAssignments}
          renderItem={renderAssignment}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Card style={styles.modalContent} elevation={5}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Assignment</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Assignment Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter assignment title"
                  value={newAssignment.title}
                  onChangeText={(text) => setNewAssignment({...newAssignment, title: text})}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter assignment description"
                  value={newAssignment.description}
                  onChangeText={(text) => setNewAssignment({...newAssignment, description: text})}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Due Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={newAssignment.dueDate}
                  onChangeText={(text) => setNewAssignment({...newAssignment, dueDate: text})}
                />
              </View>
            </ScrollView>
            
            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              />
              <Button
                title="Create Assignment"
                onPress={handleAddAssignment}
                style={styles.createButton}
              />
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  addButton: {
    padding: 4,
  },
  tabContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tabTextActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  listContent: {
    padding: 8,
  },
  assignmentCard: {
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 16,
  },
  assignmentHeader: {
    marginBottom: 12,
  },
  assignmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  assignmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submissionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submissionText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  submissionsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  submissionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  submissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  moreSubmissions: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    padding: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalForm: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  createButton: {
    flex: 2,
  },
});

export default AssignmentsScreen;