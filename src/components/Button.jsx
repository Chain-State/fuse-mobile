import { TouchableOpacity, Text } from 'react-native';
import styles from './ButtonStyles';

const FsButton = ({ onPress, title, style }) => (
  <TouchableOpacity onPress={onPress} style={{ ...style }}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default FsButton;
