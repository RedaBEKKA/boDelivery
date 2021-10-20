import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom"
import { isAuth } from './helpers/auth';

import App from './App';
import Login from './Screens/Login.jsx';
import Register from './Screens/Register';
import ForgetPassword from './Screens/ForgetPassword';
import 'react-toastify/dist/ReactToastify.css';
import Activate from './Screens/Activate.jsx';
import ResetPassword from './Screens/ResetPassword.jsx';
import PrivateRoute from './Routes/PrivateRoute';
import Private from './Screens/Private.jsx';
import AdminRoute from './Routes/AdminRoute';
import Accueil from './Screens/Accueil';
import Admins from "./Screens/AdminPages/Admins"
import Transporteurs from "./Screens/AdminPages/Transporteurs"
import Restaurateurs from "./Screens/AdminPages/Restaurateurs"










ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props=> isAuth() ? <App {...props}/>: <Login {...props} /> } />
      <Route path="/register" exact render={props=> <Register {...props}/>} />
      <Route path='/login' exact render={props => <Login {...props} />} />
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      <Route path='/users/forgotpassword' exact render={props => <ForgetPassword {...props} />} />
      <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
      <PrivateRoute path="/private" exact component={Private} /> 
      <AdminRoute path="/accueil" exact component={Accueil} />
    
      {  (isAuth()?.role || <Redirect to='/login' />  ) }
  
      {  (isAuth() && isAuth().role === 'Admin' )
      ?
      <>
      <Route path="/admins" exact component={Admins}/>
      <AdminRoute path="/accueil" exact component={Accueil} />
      <Route path="/transporteurs" exact component={Transporteurs}/>
      <Route path="/restaurateurs" exact component={Restaurateurs}/>
     
      </>
      :
      <Redirect to='/accueil' /> 
      }
     

      




    </Switch>
  </BrowserRouter>
  ,document.getElementById('root'));

