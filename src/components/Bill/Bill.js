import styles from './Bill.module.css';

import { useDispatch, useSelector } from 'react-redux';

import {FaEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';

import { deleteBill, enableEditing, openAddEditModal } from '../../features/billSlice';


const Bill = props => {
    const dispatch = useDispatch();
    return(
        <div className = {styles.billContainer}>
            <div className = {styles.details}>
                <p><strong>Description: </strong>{props.description}</p>
                <p><strong>Category: </strong>{props.category}</p>
                <p><strong>Amount in Rs.: </strong>{props.amount}</p>
                <p><strong>Date: </strong>{props.date}</p>
            </div>
            <div className = {styles.options}>
                <button onClick = {() => {
                        dispatch(openAddEditModal()) 
                        dispatch(enableEditing(props.id));
                    }}>
                    <FaEdit size = {25}/>
                </button>
                <button onClick = {() => dispatch(deleteBill(props.id))}>
                    <MdDelete size = {25}/>
                </button>
            </div>
        </div>
    );
}

export default Bill;