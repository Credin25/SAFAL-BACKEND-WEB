import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import OutboxIcon from '@mui/icons-material/Outbox';
import StoreIcon from '@mui/icons-material/Store';
import Groups2Icon from '@mui/icons-material/Groups2';
const sidebarOptions = [
    {
        label: 'Agents',
        path: '/agents',
        icon: GroupIcon
    },
    {
        label: 'Safal Users',
        path:'/safal/users',
        icon: Groups2Icon
    },
    {
        label: 'Insurance',
        path: '/insurance',
        icon: HealthAndSafetyIcon
    },
    {
        label: 'Bulk Order',
        path: '/order',
        icon: MoveToInboxIcon
    }, {

        label: 'Products',
        path: '/products',
        icon: StoreIcon
    },
    {

        label: 'Retail Orders',
        path: '/sell',
        icon: OutboxIcon
    },
    {
        label: 'Staff',
        path: '/staff/view-all',
        icon: PersonIcon
    }
]

export default sidebarOptions