import {slide as Menu} from 'react-burger-menu';
import './SideBar.css'
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
function SideBar() {
    const { username, logout } = useAuth(); // เอา token มาโชว์
    let navigate = useNavigate();
    const LogOutHandler = async (event) => {
        event.preventDefault();
        logout();
        navigate('/signin');
    };
    return (<Menu>
        <div>
        <p>{username}</p>
        <a id="main" style={{color: 'rgb(184, 183, 173)', textDecoration: 'none'}} href="/main">Main</a><br/>
        <a id="main" style={{color: 'rgb(184, 183, 173)', textDecoration: 'none'}} href="/credit">Credit</a><br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <button onClick={LogOutHandler}>
            Log out
        </button>
        </div>
    </Menu>);
}

export default SideBar;