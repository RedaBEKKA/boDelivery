import {useState} from "react";
import authSvg from '../assests/auth.gif';
import { ToastContainer, toast } from "react-toastify";
import {authenticate, isAuth} from '../helpers/auth';
import axios from "axios";
import {Redirect} from 'react-router-dom';

const Register = () =>{

  const [formData,setFormData] = useState({
    name :"",
    email : "",
    password1:"",
    password2: "",
    tel : ""
  });
  const {email,name,password1,password2,tel} = formData;

  // Handel Change From Inputs
  const handleChange = text => e =>{
    setFormData({...formData,[text] : e.target.value})
  }

  // Submit Data To Backend
  const handleSubmit = e =>{
    e.preventDefault();
    var valide = /^0[5-7]\d{8}$/;
    if(name && email && password1 && tel){
      if(valide.test(tel)){
       
        if(password1===password2){
          axios.post(`${process.env.REACT_APP_URL}/register`,{
            name,email,password:password1,tel
          }).then(res=>{
            setFormData({
              ...formData,
              name:'',
              email:'',
              password1:'',
              password2:'',
              tel:''
            });
            toast.success(res.data.message);
          }).catch(err=>{
            toast.error(err.response.data.error);
          })
        }else{
          toast.error('les mots de passe ne correspondent pas')
        }
      }else{
        toast.error('Veuillez Saisir un numero de teléphone Valide');
      }

    }else{
      toast.error('Veuillez remplir tous les champs');
    }
  }

  return(
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      {isAuth()? <Redirect to='/'/> : null}
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg  flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Admin Sign Up
            </h1>
            <form className='w-full flex-1 mt-8 text-indigo-500' onSubmit={handleSubmit}>
              <div className='mx-auto max-w-xs relative '>
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='text'
                  placeholder='Nom et prénom'
                  onChange={handleChange('name')}
                  value={name}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Mot de passe'
                  onChange={handleChange('password1')}
                  value={password1}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Confirmez le mot de passe'
                  onChange={handleChange('password2')}
                  value={password2}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='tel'
                  placeholder='Numéro de téléphone '
                  onChange={handleChange('tel')}
                  value={tel}
                />
                 <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                 Register
                </button>
              </div>
            </form>
            <div className='my-1  border-b text-center mt-5'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                Vous avez un compte
                </div>
              </div>
            <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/login'
                  target='_self'
                >
                  se Connecter
                </a>
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

export default Register;
