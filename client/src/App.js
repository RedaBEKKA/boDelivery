import {useHistory } from "react-router-dom"
import { signout } from './helpers/auth';
import {toast } from 'react-toastify';
import "./App.css"

function App() {
  const history = useHistory();

    
  return (
    <div>
      App 
      <button
                  onClick={() => {
                    signout(() => {
                      history.push("/login");
                      toast.success('Vous avez déconnecté');
                     
                    });
                  }}
                  className='mt-5 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                    Se déconnecter
                </button>    
    </div>
  );
}

export default App;
