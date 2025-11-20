import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {EmployeeInfo} from "@/redux/slice/employeeSlice";

const API_URL= "http://localhost:3001";

//Get 방식
//1. list 가져오기(전체 데이터) fetch 이름은 -> db에서 data를 가져오기 때문이다.
export const fetchGetEmployeeInfos = createAsyncThunk<EmployeeInfo[], void, {rejectValue: string}> (
    "employeeApi/fetchGetEmployeeInfos",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(`${API_URL}/app/emp`);
        console.log(response);
        return response.data; // actions.payload
      } catch {
        return thunkAPI.rejectWithValue("데이터 로드 실패");  // actions.payload
      }
    }
)

//2. 단일 객체 가져오기


//Post 방식

//3. 단일 객체 보내기(등록)

export const fetchPostEmployeeInfo = createAsyncThunk<EmployeeInfo, EmployeeInfo, {rejectValue: string}> (
    "employeeApi/fetchPostEmployeeInfo",
    async (obj, thunkAPI) => {
      try {
        const response = await axios.post(`${API_URL}/app/emp`, obj);
        console.log(response.data);
        return response.data;
      } catch {
        return thunkAPI.rejectWithValue("데이터 전송 실패")
      }
    }
)

//Delete 방식

export const fetchDeleteEmployeeInfo = createAsyncThunk<number, number, {rejectValue: string}> (
    "employeeApi/fetchDeleteEmployeeInfo",
    async (id, thunkAPI) => {
      try{
        const response = await axios.delete(`${API_URL}/app/emp/${id}`);
        console.log(response.data);
        console.log(id);
        return id;
      } catch {
        return thunkAPI.rejectWithValue("데이터 삭제 실패")
      }
    }
)

//Modify 방식

export const fetchPutEmployeeInfo = createAsyncThunk<EmployeeInfo, EmployeeInfo, {rejectValue: string}> (
  "employeeApi/fetchPutEmployeeInfo",
    async (emp, thunkAPI) => {
      try {
        const response = await axios.put(`${API_URL}/app/emp/${emp.id}`, emp);
        return response.data;
      } catch {
        return thunkAPI.rejectWithValue("데이터 수정 실패")
      }
    }
)
