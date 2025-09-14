import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'

// CREATE TODO
export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async ({ title, description, createdBy }, thunkApi) => {
    try {
      const res = await axiosInstance.post('/todo/create', { title, description, createdBy })
      return res.data
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Create todo failed'
      return thunkApi.rejectWithValue(message)
    }
  }
)

//GET TODOS
export const getTodos = createAsyncThunk("todo/getTodos",async(userId, thunkApi)=>{
  try{
    const res = await axiosInstance.get(`/todo/getAll/${userId}`)
    // console.log("list data",res.data);
    return res.data
  }catch(error){
     const message =
        error.response?.data?.message || error.message || 'Todo list get failed'
      return thunkApi.rejectWithValue(message)
  }
})

 // DELETE TODO

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id, thunkApi) => {
    try {
   await axiosInstance.post(`/todo/delete/${id}`);
   console.log('data deleter for the id ', id)
      return id; 
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Delete todo failed';
      return thunkApi.rejectWithValue(message);
    }
  }
);
  
// update 

export  const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async ({id,updatedTodo}, thunkApi)=>{
    try { 
         const res=  await axiosInstance.patch(`/todo/update/${id}`, updatedTodo);
         return res.data;
    }
   catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Update todo failed';
      return thunkApi.rejectWithValue(message);
    }
  }
 )



const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    loading: false,
    error: null,
    todos: [],   // 👈 todos array rakha
    success: false,
  },
  reducers: {
    reset: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    // CREATE TODO
    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.todos.unshift(action.payload.data) 
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      })


      // GET TODOS
        .addCase(getTodos.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.todos=action.payload.data
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      }) 
      // DELETE TODO
        .addCase(deleteTodo.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.todos = state.todos.filter((item)=> item.data?._id!=action.payload)
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      }) 
      // Update TODO
        .addCase(updateTodo.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.todos = state.todos.map((item)=> item.data?._id!=action.payload._id ? action.payload : item)
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      }) 
  },
})

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;
