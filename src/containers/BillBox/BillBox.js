import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openAddEditModal, applyFilter, } from '../../features/billSlice';
import { setBills, calculateTotal, setMonthlyBudget, setShowBillsToPay, unsetShowBillsToPay } from '../../features/billSlice';

import styles from './BillBox.module.css';

import data from '../../sample-data.json';
import Bill from '../../components/Bill/Bill';
import AddEditBill from '../../components/AddEditBill/AddEditBill';


const BillBox = props => {
    const {bills, selectedFilter, showAddEditModal, totalBillAmount, editing, editBillId, filters, monthlyBudget, showBillsToPay} = useSelector(store => store.bill);
    const dispatch = useDispatch();

    // storing the data for bills locally...
    useEffect(() =>{
      if(!localStorage.getItem('bills')){
        localStorage.setItem('bills', JSON.stringify(data.bills));
        // console.log('hi');
      }
      const bills = JSON.parse(localStorage.getItem('bills'));
      dispatch(setBills(bills));
    }, []);
  
    //updating the total whenever there is a change in bills
    useEffect(() => {
      dispatch(calculateTotal());
    }, [bills]);

    //storing the bills in the content variable
    let content = [];
    if(showBillsToPay){
        const newBills = [...bills];
        newBills.sort((a, b) => {
            if(Number(a.amount) >= Number(b.amount))
                return -1;
            else
                return 1;
        });
        let mb = monthlyBudget;
        for(let i in newBills){
            if(Number(newBills[i].amount) > mb){
                continue;
            }
            mb -= Number(newBills[i].amount);
            content.push(
                <Bill key = {newBills[i].id} {...newBills[i]} /> 
            );
        }
        if(content.length === 0){
            content = 'No bills with amount under Rs. ' + monthlyBudget;
        }
    }
    else{
        if(bills.length){
            if(selectedFilter !== "Filters"){
                const validBills = bills.filter(bill => bill.category.toLowerCase() === selectedFilter.toLowerCase())
                if(validBills.length){
                    content = validBills.map(bill => (
                        <Bill key = {bill.id} {...bill} />        
                    ));
                }
                else{
                    content = 'Nothing found for this category';
                }
            }
            else{
                content = bills.map(bill => (
                    <Bill key = {bill.id} {...bill} />
                ));
            }
        }
        else
            content = 'Nothing to display';
    }


    //handler function for select filters options...
    const changeHandler = event => {
        dispatch(applyFilter(event.target.value));
    }

    let editableBill = null;
    if(editing){
        editableBill = bills.find(bill => bill.id === editBillId);
    }

    const handlerForBillsPay = () => {
        if(showBillsToPay){
            dispatch(unsetShowBillsToPay());
        }
        else
            dispatch(setShowBillsToPay());
    }

    return(
        <React.Fragment>
            {showAddEditModal ? <AddEditBill bill = {editableBill} edit = {editing} /> : null}
            <div style = {{marginLeft: '25%', marginTop: '50px'}}>
                Total Amount: Rs. {totalBillAmount}
            </div>
            <div className = {styles.btnHeader}>
                <select value = {selectedFilter} name = 'filters' onChange = {event => changeHandler(event)}>
                    {filters.map((filter, index) => (
                        <option value = {filter} key = {index}>{filter}</option>
                    ))}
                </select>
                <div>
                    <label>Monthly Budget</label>&nbsp;&nbsp;
                    <input className = {styles.inputStyle} type = 'text' value = {String(monthlyBudget)} onChange = {event => dispatch(setMonthlyBudget(Number(event.target.value)))} placeholder = 'Ex: 50000' />&nbsp;&nbsp;
                    <button onClick = {handlerForBillsPay} className = {styles.btns}>{showBillsToPay ? 'Cancel' : 'Click To Check'}</button>
                </div>
                <button onClick = {() => dispatch(openAddEditModal())} className = {styles.btns}>Add Bill</button>
            </div>
            <div className = {styles.container}>
                {content}   
            </div>
        </React.Fragment>
    );
}

export default BillBox;
