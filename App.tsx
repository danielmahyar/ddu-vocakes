import 'react-native-gesture-handler';
import { AuthProvider } from './hooks/useAuth';
import Navigator from './navigators/Navigator';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  LogBox.ignoreLogs(['AsyncStorage has been extracted from '])


  return (
    <AuthProvider>

      <Navigator />

    </AuthProvider>
  );
}