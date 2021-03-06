import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { func } from 'prop-types';

axios.defaults.baseURL =
  'https://6273aa66345e1821b21f43bc.mockapi.io/api/contacts';
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get();
      if (response.statusText !== 'OK') {
        throw new Error("Can't download contacts. Server error.");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.delete(`/${id}`);
      if (response.statusText !== 'OK') {
        throw new Error("Can't delete contact. Server error.");
      }
      dispatch(contactDeleted(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async function ({ name, number }, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.post('', {
        name,
        number,
      });
      if (response.statusText !== 'Created') {
        throw new Error("Can't add contact. Server error.");
      }
      dispatch(contactAdded(response.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const contactsSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
    filter: '',
    status: null,
    error: null,
  },
  reducers: {
    contactAdded(state, action) {
      state.contacts.push(action.payload);
    },
    contactDeleted(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload,
      );
    },
    filteredContacts(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.contacts = action.payload;
    },
    [fetchContacts.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [addContact.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
export const { contactAdded, contactDeleted, filteredContacts } =
  contactsSlice.actions;
export default contactsSlice.reducer;
