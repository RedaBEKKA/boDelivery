import { useState,useMemo,useEffect } from 'react';
import {useTable} from 'react-table'
import axios from 'axios';
import {COLUMNS} from './columns'
import "../AdminsTable/table.css"

const Table= () =>{

  const [data, setData] = useState([]);

  useEffect(async() => {
    await axios.get(`${process.env.REACT_APP_URL}/transporteurs`)
    .then(res =>{
      console.log(res.data)
      setData(res.data);})
  },[])


  const columns = useMemo(()=>COLUMNS, [])

  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({columns,data})

  return(
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
  )
}

export default Table;