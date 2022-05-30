import { NavLink } from "react-router-dom";

import styles from './Navigation.module.css';

const Navigation = props => {
    return (
        <div className = {styles.navContainer}>
            <NavLink to = '/' className = {({isActive}) => isActive? styles.active: styles.navBtns}>Home</NavLink>
            <NavLink to = '/l2' className = {({isActive}) => isActive? styles.active: styles.navBtns}>Monthly TimeSeries Chart</NavLink>
        </div>
    );
}

export default Navigation;