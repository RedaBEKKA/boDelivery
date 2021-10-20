import { useState, useEffect } from 'react';
import authSvg from '../assests/update.gif';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';

const Private = ({ history }) => {


   const [formData, setFormData] = useState({
     name: '',
     email: '',
     tel: '',
     role: ''
   });

 useEffect(() => {
     loadProfile();
  }, []);

   const loadProfile = () => {
      const token = getCookie('token');
      axios
        .get(`${process.env.REACT_APP_URL}/user/${isAuth()._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
       }
        })
      .then(res => {
         const { role, name, email,tel } = res.data;
        setFormData({ ...formData, role, name, email,tel });
      })
      .catch(err => {
       toast.error(`Erreur à vos informations ${err.response.statusText}`);
       if (err.response.status === 401) {
        signout(() => {
           history.push('/login');
         });
       }
      });
  };

   const { name, email, role,tel } = formData;

   const handleChange = text => e => {
     setFormData({ ...formData, [text]: e.target.value });
   };

   const handleSubmit = e => {
     const token = getCookie('token');
     e.preventDefault();
     setFormData({ ...formData});
     axios
       .put(
         `${process.env.REACT_APP_URL}/user/update`,
         {
           name,
           email,
           tel

         },
         {
          headers: {
             Authorization: `Bearer ${token}`
           }
         }
       )
       .then(res => {
         updateUser(res, () => {
           toast.success('Mise à jour du profil réussie');
           setFormData({ ...formData});
         });
       })
       .catch(err => {
        // console.log(err.response);
        toast.error(err.response.data.errors);
       });
   };

  return(
   
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Profile Update
            </h1>

            <form
              className='w-full flex-1 mt-8 text-indigo-500'
             onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                <input
                  disabled
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='text'
                  placeholder='Role'
                  value={role}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='email'
                  placeholder='Email'
                  disabled
                  value={email}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='text'
                  placeholder='Name'
                  onChange={handleChange('name')}
                  value={name} 
                />

                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='tel'
                  placeholder='numéro de téléphone'
                  onChange={handleChange('tel')}
                  value={tel}
                />
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                 Mettre à jour
                </button>
              </div>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                Aller au tableau de bord
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/admin'
                  target='_self'
                > 
                  Accueil
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Private;
