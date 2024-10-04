import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupIcon from '@mui/icons-material/Group';
const sidebarOptions = [
    {
        label: "Agents",
        path: '/agents',
        icon: GroupIcon
    },
    {
        label: 'Insurance',
        path: '/',
        icon: InboxIcon
    },
    {
        label: 'Our Orders',
        path: '/order',
        icon: MailIcon
    }, {

        label: 'Products',
        path: '/products',
        icon: AccountBoxIcon
    },
    {

        label: 'Selling Orders',
        path: '/sell',
        icon: MailIcon
    },
    {
        label: 'Staff',
        path: '/staff/view-all',
        icon: MailIcon
    }
]

export default sidebarOptions