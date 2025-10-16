import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const ChatListScreen = ({ navigation }) => {
  const { chats, allUsers } = useChat();
  const { user } = useAuth();

  const getChatName = (chat) => {
    const otherParticipantIds = chat.participants.filter(id => id !== user.id);
    if (otherParticipantIds.length === 1) {
      const user = allUsers.find(u => u.id === otherParticipantIds[0]);
      return user?.name || 'Unknown User';
    }
    return 'Group Chat';
  };

  const getLastMessage = (chat) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage ? lastMessage.text : 'No messages yet';
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', { chatId: item.id })}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>💬</Text>
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{getChatName(item)}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {getLastMessage(item)}
        </Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.timestamp}>
          {item.messages.length > 0 ? 
            new Date(item.messages[item.messages.length - 1].timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            : ''
          }
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.newChatButton}>
          <Text style={styles.newChatText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search messages..."
        placeholderTextColor="#999"
      />
      
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  newChatButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newChatText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    margin: 15,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: '#999', 
  },
});

export default ChatListScreen;