
import './App.css';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModals';
import InviteMemberModal from './components/Modals/InviteMemberModal';

function App() {
  return <BrowserRouter>
    <AuthProvider>
      <AppProvider>
        <Switch>
          <Route component={Login} path="/login"/>
          <Route component={ChatRoom} path="/"/>
        </Switch>
        <AddRoomModal/>
        <InviteMemberModal/>
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
}

export default App;
