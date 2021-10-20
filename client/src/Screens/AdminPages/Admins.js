import Sidebar from '../components/SideBar/Sidebar'
import { ToastContainer} from 'react-toastify';
import Table from '../components/AdminsTable/Table'

const Admins = () =>{

  return (
    <div>
      <ToastContainer/>
      <Sidebar/>
      <Table/>
    </div>
  )
}

export default Admins;