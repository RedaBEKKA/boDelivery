import React from 'react';
import { Route} from 'react-router-dom';
import { isAuth } from '../helpers/auth';

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
           (isAuth() && isAuth().role === 'Admin' ) ? (
                <Component {...props} />
            ) : (
                <div className="flex items-center justify-center h-screen">
                        <div className="bg-blue-600 text-white font-bold rounded-lg border shadow-lg p-10">
                        Veuillez patienter jusqu'à ce que vous soyez accepté dans la liste des administrateurs
                        </div>  
  </div>
            )
        }
    ></Route>
);

export default AdminRoute;