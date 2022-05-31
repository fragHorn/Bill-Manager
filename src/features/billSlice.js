import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bills: [],
  totalBillAmount: 0,
  showAddEditModal: false,
  filters: [],
  selectedFilter: "Filters",
  lastId: 0,
  editing: false,
  editBillId: "",
  monthlyBudget: 50000,
  showBillsToPay: false,
};

const billSlice = createSlice({
  name: "Bills",
  initialState,
  reducers: {
    setBills: (state, action) => {
      state.bills = action.payload;
      let filters = ["Filters"];
      action.payload.map((bill) => {
        filters.push(bill.category);
      });
      state.filters = filters;
      state.lastId = Math.floor(Math.random() * 100000);
    },
    addBill: (state, action) => {
      state.bills.unshift(action.payload);
      state.lastId = state.lastId + 1;
      const findFilter = state.filters.find(
        (filter) =>
          filter.toLowerCase() === action.payload.category.toLowerCase()
      );
      if (!findFilter) state.filters.push(action.payload.category);
      localStorage.setItem("bills", JSON.stringify(state.bills));
    },
    editBill: (state, action) => {
      const billIndex = state.bills.findIndex(
        (bill) => bill.id === action.payload.id
      );
      state.bills[billIndex] = action.payload;
      state.editing = false;
      const findFilter = state.filters.find(
        (filter) =>
          filter.toLowerCase() === action.payload.category.toLowerCase()
      );
      if (!findFilter) state.filters.push(action.payload.category);
      localStorage.setItem("bills", JSON.stringify(state.bills));
      state.editing = false;
    },
    deleteBill: (state, action) => {
      const newBills = state.bills.filter((bill) => bill.id !== action.payload);
      state.bills = newBills;
      localStorage.setItem("bills", JSON.stringify(state.bills));
    },
    calculateTotal: (state, action) => {
      const total = state.bills.reduce(
        (prevSum, bill) => prevSum + Number(bill.amount),
        0
      );
      state.totalBillAmount = total;
    },
    openAddEditModal: (state, { payload }) => {
      state.showAddEditModal = true;
    },
    closeAddEditModal: (state, { payload }) => {
      state.showAddEditModal = false;
      state.editing = false;
    },
    applyFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
    enableEditing: (state, action) => {
      state.editing = true;
      state.editBillId = Number(action.payload);
    },
    setMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
    setShowBillsToPay: (state, action) => {
        state.showBillsToPay = true;
    },
    unsetShowBillsToPay: (state, action) => {
        state.showBillsToPay = false;
    }
  },
});

export const {
  setBills,
  addBill,
  editBill,
  deleteBill,
  calculateTotal,
  openAddEditModal,
  closeAddEditModal,
  applyFilter,
  enableEditing,
  setMonthlyBudget,
  setShowBillsToPay,
  unsetShowBillsToPay,
} = billSlice.actions;

export default billSlice.reducer;
