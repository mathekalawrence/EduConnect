import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Layout/Card';
import EmptyState from '../components/Layout/EmptyState';
import Header from '../components/Layout/Header';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const ChatListScreen = ({ navigation }) => {
  const { chats, allUsers } = useChat();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredChats = chats.filter(chat => 
    getChatName(chat).toLowerCase().includes(searchQuery.toLowerCase()) ||
    getLastMessage(chat).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item }) => (
    <Card 
      onPress={() => navigation.navigate('Chat', { chatId: item.id })}
      style={styles.chatCard}
      elevation={1}
    >
      <View style={styles.chatItem}>
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
          {item.messages.some(msg => !msg.read && msg.senderId !== user.id) && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>1</Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Messages" 
        rightComponent={
          <TouchableOpacity style={styles.newChatButton}>
            <Icon name="add" size={24} color="white" />
          </TouchableOpacity>
        }
      />
      
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Icon name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      
      {filteredChats.length === 0 ? (
        <EmptyState
          icon="chatbubble-outline"
          title="No conversations"
          message={searchQuery ? "No messages match your search" : "Start a conversation by messaging someone"}
          actionTitle="Find Contacts"
        />
      ) : (
        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    padding: 8,
  },
  chatCard: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
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
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#4CAF50',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  newChatButton: {
    padding: 4,
  },
});

export default ChatListScreen;