import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useEdu } from '../context/EduContext';

const { width } = Dimensions.get('window');

const GradesScreen = () => {
  const { grades } = useEdu();
  const { user } = useAuth();

  const studentGrades = grades.filter(grade => grade.studentId === user.id);

  const calculateAverage = () => {
    const total = studentGrades.reduce((sum, grade) => {
      const gradeValue = {
        'A': 95, 'A-': 92, 'B+': 88, 'B': 85, 'B-': 82,
        'C+': 78, 'C': 75, 'C-': 72, 'D': 65, 'F': 55
      }[grade.grade] || grade.progress;
      return sum + gradeValue;
    }, 0);
    return (total / studentGrades.length).toFixed(1); 
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return '#4CAF50';
    if (grade >= 80) return '#8BC34A';
    if (grade >= 70) return '#FFC107';
    if (grade >= 60) return '#FF9800';
    return '#F44336';
  };

  const ProgressBar = ({ progress, color }) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Academic Performance</Text>
        <View style={styles.averageContainer}>
          <Text style={styles.averageLabel}>Overall Average</Text>
          <Text style={styles.averageValue}>{calculateAverage()}%</Text>
        </View>
      </View>

      <View style={styles.gradesContainer}>
        {studentGrades.map((grade, index) => (
          <View key={index} style={styles.gradeCard}>
            <View style={styles.gradeHeader}>
              <Text style={styles.subjectName}>{grade.subject}</Text>
              <View style={styles.gradeBadge}>
                <Text style={[
                  styles.gradeText,
                  { color: getGradeColor(grade.progress) }
                ]}>
                  {grade.grade}
                </Text>
              </View>
            </View>
            
            <View style={styles.progressSection}>
              <Text style={styles.progressLabel}>Progress: {grade.progress}%</Text>
              <ProgressBar progress={grade.progress} color={getGradeColor(grade.progress)} />
            </View>

            <View style={styles.performanceIndicators}>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>Assignments</Text>
                <Text style={styles.indicatorValue}>15/16</Text>
              </View>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>Tests</Text>
                <Text style={styles.indicatorValue}>4/4</Text>
              </View>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>Participation</Text>
                <Text style={styles.indicatorValue}>95%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Performance Summary</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>A</Text>
            <Text style={styles.statLabel}>Mathematics</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>B+</Text>
            <Text style={styles.statLabel}>Physics</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>A-</Text>
            <Text style={styles.statLabel}>English</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  averageContainer: {
    alignItems: 'center',
  },
  averageLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  averageValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  gradesContainer: {
    padding: 15,
  },
  gradeCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  gradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  gradeBadge: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 2,
  },
  gradeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressSection: {
    marginBottom: 15,
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  performanceIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: {
    alignItems: 'center',
  },
  indicatorLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  indicatorValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  statsContainer: {
    padding: 15,
    marginTop: 10,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: (width - 60) / 2,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default GradesScreen;