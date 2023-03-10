import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import PersonIcon from '@mui/icons-material/Person';



const BottomNavBar = () => {
    const {user} = useAuth();
    return ( 
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels>
            <BottomNavigationAction icon={<PersonIcon/>} label={!user ? ("Not logged in!"):(`${user?.email}`)}>
            </BottomNavigationAction>
        </BottomNavigation>
        </Paper>
     );
}
 
export default BottomNavBar;