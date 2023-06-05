import { TouchableOpacity, Text } from 'react-native';
import styles from './ButtonStyles';

const FsButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default FsButton;
