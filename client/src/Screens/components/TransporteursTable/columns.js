import {format} from "date-fns"

export const COLUMNS = [
  {
    Header: 'Nom',
    accessor : 'nom'
  },
  {
    Header: 'Prénom',
    accessor : 'prenom'
  },
  {
    Header: 'E-mail',
    accessor : 'email'
  },
  {
    Header: 'Date de Naissance',
    accessor : 'dateNaissance',
    Cell : ({value}) =>{return format(new Date(value), 'dd/MM/yyyy')}
  },
 

]