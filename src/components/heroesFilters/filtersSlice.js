import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
}



export const fetchFilters = createAsyncThunk(
    'filters/fetching',
    () => { const {request} = useHttp();
        return request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
        state.activeFilter = action.payload
      },
  
  },
  extraReducers: (builder) => {
     builder
        .addCase(fetchFilters.pending, (state) => {
            state.filtersLoadingStatus = 'loading'
        })
        .addCase(fetchFilters.fulfilled, (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle'
        })
        .addCase(fetchFilters.rejected, (state) => {
            state.filtersLoadingStatus = 'error'
        })
        .addDefaultCase(() => {})
  }

})

const {reducer, actions} = filtersSlice

export const { activeFilterChanged  } = actions

export default reducer


