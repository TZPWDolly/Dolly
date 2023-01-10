import logo from './logo.svg';
import './App.css';

import React, { useState} from 'react';

import LoginPage from './pages/Login/LoginPage';
import DefaultMainPage from './pages/Default/DefaultMainPage';
import EntryHomePageMenu from './components/Entry/EntryHomePageMenu';
import EntryPageMenu from './components/Entry/EntryPageMenu';
import DefaultMainPageMenu from './components/Default/DefaultMainPageMenu';
import { UserContext } from './components/context/user';
import { RegPatientContext } from './components/context/regPatient';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {

  //For user level
  const [user, setUser] = useState(null);

  //For RegPatientData (for user level 2)
  const [regPatientData, setRegPatientData] = useState(null);

  return (
    <UserContext.Provider value={{user,setUser}}>
    <RegPatientContext.Provider value={{regPatientData, setRegPatientData}}>
    <Router>
      <div>
        <Switch>
          
            <Route path="/" exact component={LoginPage} />
            <Route exact path="/dashboard" component={DefaultMainPage} />
            <Route exact path="/entryhomepage" component={EntryHomePageMenu} /> {/* HomePage */}
            <Route exact path="/entrypage" component={EntryPageMenu} /> {/* RegisterPage */}
            <Route exact path="/coverage" component={DefaultMainPage} />
            <Route exact path="/dashboard?" render={props => <DefaultMainPageMenu {...props} />} />
  
        </Switch>
      </div>
    </Router>
    </RegPatientContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

{/* <Redirect exact from="/defaultmainpage" to="/defaultmainpage/defaultdashboard" />
<Route exact path="/defaultmainpage/defaultdashboardpage" component={DefaultDashboardPage}/>
            <Route exact path="/defaultmainpage/:page?" render={props => <DefaultDashboardTab {...props} />} /> */}