import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

const Card = ({ 
  children, 
  style, 
  onPress, 
  elevation = 2,
  borderRadius = 12 
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent 
      style={[
        styles.card,
        {
          borderRadius,
          shadowOpacity: elevation * 0.1,
          shadowRadius: elevation * 2,
          elevation: elevation,
        },
        style
      ]}
      onPress={onPress}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    marginVertical: 4,
    marginHorizontal: 2,
  },
});

export default Card;
