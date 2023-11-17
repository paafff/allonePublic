import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import p1KuningBlank from './../assets/blankprofile/p1KuningBlank.png';

const initialState = {
  user: null,
  loading: false,
  error: null,
  message: '',
};

// Aksi untuk mendapatkan data user yang sedang login
export const getMe = createAsyncThunk(
  'user/getMe',
  async (unusedParameter, thunkAPI) => {
    try {
      //disini adalah titik masalah jika tidak menggunakan &&, karena pada database untuk gambar yang bernilai null tetap akan diproses menjadi blob
      //dengan menggunakan && maka data image yang bernilai null tidak akan diproses dan tidak akan terjadi error
      //kemudian jika nilai null maka gambar akan otomatis berisi blankprofile
      const response = await axios.get('http://localhost:5000/getme');
      if (response.data.profile && response.data.profile.data) {
        const buffer = response.data.profile.data;
        const blob = new Blob([new Uint8Array(buffer)], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(blob);
        response.data.profile = imageUrl;
      } else {
        response.data.profile = p1KuningBlank;
      }

      // const bufferBlank = await fetch(blankProfileWhite).then((response) => response.arrayBuffer());
      // const blobBlank = new Blob([bufferBlank], { type: "image/png" });
      // const imageUrlBlank = URL.createObjectURL(blobBlank);

      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Aksi untuk melakukan logout user
export const logOut = createAsyncThunk('user/LogOut', async () => {
  await axios.delete('http://localhost:5000/logout');
  alert('Sukses logout');
});

// Slice untuk manajemen state otentikasi
export const authSlice = createSlice({
  name: 'auth/slice',
  initialState,
  reducers: {
    resetState: () => initialState,
  },

  //  Ini adalah tempat untuk menangani tindakan asinkron atau tindakan yang diproduksi oleh createAsyncThunk
  extraReducers: (builder) => {
    builder

      // Reducer saat mendapatkan data user sedang berjalan
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Reducer saat mendapatkan data user berhasil
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = action.payload;
      })
      // Reducer saat mendapatkan data user gagal
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Meskipun action creators ini berbeda jenisnya (reducer vs. extra reducer),
// mereka dianggap sama dalam hal authSlice.actions
export const reset = authSlice.actions.resetState;
//dibawah ini opsi export reset,nested dan bagimana konsep export import fungsi
// export const  {reset}  = authSlice.actions;
export default authSlice;
