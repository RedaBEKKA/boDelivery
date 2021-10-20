import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
{
  title : 'Table De Board',
  path: '/accueil',
  icon: <AiIcons.AiFillHome />,
  iconClosed: <RiIcons.RiArrowDownSFill />,
  iconOpened: <RiIcons.RiArrowUpSFill />,
},

{
  title: 'Admins',
  path: '/admins',
  icon: <AiIcons.AiOutlineUser/>
},
{
  title: 'Transporteurs',
  path: '/transporteurs',
  icon: <AiIcons.AiOutlineUser/>
},
{
  title: 'Restaurateurs',
  path: '/restaurateurs',
  icon: <AiIcons.AiOutlineUser/>
},

]