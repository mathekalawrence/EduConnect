import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle 
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (disabled) {
      return [...baseStyle, styles.disabled];
    }
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primary];
      case 'secondary':
        return [...baseStyle, styles.secondary];
      case 'outline':
        return [...baseStyle, styles.outline];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`text${size}`]];
    
    if (disabled) {
      return [...baseStyle, styles.textDisabled];
    }
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.textPrimary];
      case 'secondary':
        return [...baseStyle, styles.textSecondary];
      case 'outline':
        return [...baseStyle, styles.textOutline];
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#4CAF50' : 'white'} 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  primary: {
    backgroundColor: '#4CAF50',
  },
  secondary: {
    backgroundColor: '#2196F3',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  disabled: {
    backgroundColor: '#CCCCCC',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textsmall: {
    fontSize: 14,
  },
  textmedium: {
    fontSize: 16,
  },
  textlarge: {
    fontSize: 18,
  },
  textPrimary: {
    color: 'white',
  },
  textSecondary: {
    color: 'white',
  },
  textOutline: {
    color: '#4CAF50',
  },
  textDisabled: {
    color: '#666666',
  },
});

export default Button;