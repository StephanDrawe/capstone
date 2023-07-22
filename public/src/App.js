import './App.css';
import * as React from "react";
// import * as ReactDOM from "react-dom";
import { Route, Routes } from "react-router-dom";
import { NavBar } from './Components/navbar';
import { Home } from './Components/home';
import { CreateAccount } from './Components/createacount';
import { Login } from './Components/login';
import { Deposit } from './Components/deposit';
import { Withdraw } from './Components/withdraw';
import { Balance } from './Components/balance';
import { AllData } from './Components/alldata';
import { UserContext } from './Components/Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar2 } from './Components/navbar2';
import { Logout } from './Components/logout';
import { Transfer } from './Components/transfer';



function App() {
  const [user, setUser] = React.useState(null);

  const value = React.useMemo(() => ({ user, setUser }), [user, setUser]);


  return (
    <>
    <UserContext.Provider value={value}>
      {(user && user !== "Login failed: user not found" && user !== "Login failed: wrong password") ? <NavBar /> : <NavBar2 />}
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createAccount' element={<CreateAccount />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Deposit' element={<Deposit />} />
          <Route path='/Withdraw' element={<Withdraw />} />
          <Route path='/Transfer' element={<Transfer />} />
          <Route path='/Balance' element={<Balance />} />
          <Route path='/allData' element={<AllData />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
