import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import OutboxIcon from '@mui/icons-material/Outbox';
import StoreIcon from '@mui/icons-material/Store';
const sidebarOptions = [
    {
        label: "Agents",
        path: '/agents',
        icon: GroupIcon
    },
    {
        label: 'Insurance',
        path: '/insurance',
        icon: HealthAndSafetyIcon
    },
    {
        label: 'Our Orders',
        path: '/order',
        icon: MoveToInboxIcon
    }, {

        label: 'Products',
        path: '/products',
        icon: StoreIcon
    },
    {

        label: 'Selling Orders',
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