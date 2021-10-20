import { useState,useMemo,useEffect } from 'react';
import {useTable} from 'react-table'
import axios from 'axios';
import { getCookie } from '../../../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';

import "./table.css"

const Table= () =>{
  const [data, setData] = useState([]);


  
  const COLUMNS = [
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
      Header: 'Delete',
      Cell : ({row}) =>(
  
        JSON.parse(localStorage.getItem('user'))._id === row.original._id
         ?  
        <></>
        :
       <button onClick={()=> DeleteUser(row.original._id,row.original.name)}>Delete</button>
  
      )
    },
    {
      Header: 'To Admin',
      Cell : ({row}) =>(
        
        row.original.role === "Admin" 
        ? <span>✅</span>
        :<button onClick={()=>userToAdmin(row.original._id,row.original.name)} >approve</button>
  
      )
    }
  
  ]

  const columns = useMemo(()=>COLUMNS,[])

  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({columns,data})

 const getAllUsers = () =>{
 axios.get(`${process.env.REACT_APP_URL}/users`)
  .then(res =>{ 
    setData(res.data);  })
 }



  const DeleteUser = async (userId,name ) =>{
    
  
    const token = getCookie('token');
    if(window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${name} ?`)){
    await axios
      .delete(`${process.env.REACT_APP_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
     }
     
    }).then(()=>{
      toast.success("L'utilisateur a été supprimé avec succès")
      getAllUsers()
      
    })
      }

  }

  const userToAdmin = async (userId,name) =>{
    const token = getCookie('token');
    if(window.confirm(`Êtes-vous sûr de donner à l'utilisateur ${name} le role d' Admin ?`)){
    await axios
      .put(`${process.env.REACT_APP_URL}/user/toadmin/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
    
      }).then(()=>{
        window.location.reload()
    
           
    })
      
  }}
  
  useEffect(async () => {
    await getAllUsers();
    
  },[])

 


  return(
    <>
<ToastContainer/>
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map(headerGroup=>(
            <tr {...headerGroup.getHeaderGroupProps()}>
            {
              headerGroup.headers.map(column=>(
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))
            }
            
          </tr>
          ))
        }
          
      </thead>
      <tbody {...getTableBodyProps()}>
      {
        rows.map(row=>{
          prepareRow(row)
          return(
            <tr {...row.getRowProps()}>
            {
              row.cells.map(cell =>{
                return(
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>  
                )
              })
            }
                 
        </tr>
          )
        })
      }
       
      </tbody>
    </table>

    </>
  )
}

export default Table;