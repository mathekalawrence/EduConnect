import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EmptyState = ({ 
  icon = 'school-outline',
  title = 'Nothing here yet',
  message = 'This area is empty for now',
  action,
  actionTitle 
}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={80} color="#CCCCCC" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {action && actionTitle && (
        <TouchableOpacity style={styles.actionButton} onPress={action}>
          <Text style={styles.actionText}>{actionTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  icon: {
    marginBottom: 20,
    opacity: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
  actionButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default EmptyState;