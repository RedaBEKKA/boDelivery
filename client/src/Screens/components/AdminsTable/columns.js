import axios from 'axios';
import { getCookie } from '../../../helpers/auth'


const DeleteUser = (userId ) =>{

  const token = getCookie('token');
  axios
    .delete(`${process.env.REACT_APP_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
   }
}).then(res =>{ 
  axios.get(`${process.env.REACT_APP_URL}/users`)
})

}

export const COLUMNS = [
  {
    Header: 'Nom',
    accessor : 'name'
  },
  {
    Header: 'E-mail',
    accessor : 'email'
  },
  {
    Header: ' N° Téléphone',
    accessor : 'tel'
  },
  {
    Header: 'Role',
    accessor : 'role'
  },
  {
    Header: 'Delete',
    Cell : ({row}) =>(

      JSON.parse(localStorage.getItem('user'))._id === row.original._id
       ?  
      <></>
      :
      <button onClick={()=> DeleteUser(row.original._id)}>Delete</button>

    )

  }

]