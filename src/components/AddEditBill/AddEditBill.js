import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeAddEditModal, addBill, editBill } from '../../features/billSlice';
import { amountAction, dateAction, categoryAction, descriptionAction, clearVals } from '../../features/addEditSlice';

import styles from './AddEditBill.module.css';

const AddEditBill = props => {
    const dispatch = useDispatch();
    const {amount, date, category, description} = useSelector(store => store.addEdit);
    const {lastId, editBillId} = useSelector(store => store.bill);

    useEffect(() => {
        if(props.edit){
            dispatch(descriptionAction(props.bill.description));
            dispatch(categoryAction(props.bill.category));
            dispatch(amountAction(props.bill.amount));
            dispatch(dateAction(props.bill.date))
        }
    }, [editBillId]);

    //funtion to handle form input change...
    const onFormValChangeHandler = (event, type) => {
        let val = event.target.value;
        switch(type){
            case 'desc': dispatch(descriptionAction(val));  
                         break;
            case 'cat': dispatch(categoryAction(val));  
                         break;
            case 'amt': dispatch(amountAction(Number(val)));  
                         break;
            case 'date':
                        const date = val.split('-');
                        val = date[2] + '-' + date[1] + '-' + date[0]; 
                        dispatch(dateAction(val));  
                        break;
            default: console.log('wrong val');
        };
    }

    //funtion to handle the form submission...
    const onSubmitHandler = event => {
        event.preventDefault();
        const newBill = {
            description: description,
            amount: amount, 
            category: category,
            date: date
        };
        if(props.edit){
            newBill['id'] = props.bill.id;
            dispatch(editBill(newBill));
        }
        else{
            newBill['id'] = lastId + 1;
            dispatch(addBill(newBill));
        }
        dispatch(closeAddEditModal());
        dispatch(clearVals());
    }

    return (
        <>
            <div className = {styles.backdrop} onClick = {() => dispatch(closeAddEditModal())}></div>
            <div className = {styles.formContainer}>
                <h1 style = {{textAlign: 'center'}}>{props.edit ? 'Edit the Bill': 'Create a new Bill'}</h1>
                <form onSubmit = {onSubmitHandler}>
                    <label>Description:</label>
                    <input type = 'text'
                            value = {description}
                            placeholder = 'Description'
                            onChange = {event => onFormValChangeHandler(event, 'desc')}
                    />
                    <label>Category:</label>
                    <input type = 'text'
                            value = {category}
                            placeholder = 'Category'
                            onChange = {event => onFormValChangeHandler(event, 'cat')}
                    />
                    <label>Amount:</label>
                    <input type = 'number'
                            value = {amount}
                            placeholder = '0'
                            onChange = {event => onFormValChangeHandler(event, 'amt')}
                    />
                    <label>Date:</label>
                    <input type = 'date'
                            onChange = {event => onFormValChangeHandler(event, 'date')}
                    />
                    <button type = 'submit'>{props.edit ? 'Edit Bill' : 'Create Bill' }</button>
                </form>
            </div>
        </>
    );
}

export default AddEditBill;