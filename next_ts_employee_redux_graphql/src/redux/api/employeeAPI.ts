import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {EmployeeInfo} from "@/redux/slice/employeeSlice";

const GRAPH_URL= "http://localhost:3001/graphql";

//공통 graphQL 응답 타입
type GraphQLResponse<T> = {
  data: T,
  errors?: {message: string}[]
}

//Get 방식
//1. list 가져오기(전체 데이터) fetch 이름은 -> db에서 data를 가져오기 때문이다.
export const fetchGetEmployeeInfos = createAsyncThunk<EmployeeInfo[], void, {rejectValue: string}> (
    "employeeApi/fetchGetEmployeeInfos",
    async (_, thunkAPI) => {
        const query = `
                    query {
              employees {
                id
                name
                age
                job
                language
                pay
              }
            }
        `
      try {
        const response = await axios.post<GraphQLResponse<{employees: EmployeeInfo[]}>>(GRAPH_URL, {query});

        console.log(response);

        if(response.data.errors?.length) return thunkAPI.rejectWithValue("GraphQL error");

        return response.data.data.employees; // actions.payload
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
        const mutation = `
                      mutation createEmployee($input: EmployeeInput!) {
                      createEmployee(input: $input) {
                        id
                        name
                        age
                        job
                        language
                        pay
                      }
                    }
                      `
      try {
        const response = await axios.post<GraphQLResponse<{createEmployee:EmployeeInfo}>>(GRAPH_URL, {
          query : mutation,
          variables : { input: {
              name: obj.name,
              age: Number(obj.age),
              job: obj.job,
              language: obj.language,
              pay: Number(obj.pay)
            }
          }
        });

        if(response.data.errors?.length) return thunkAPI.rejectWithValue("GraphQL error");

        console.log(response.data);
        return response.data.data.createEmployee;
      } catch {
        return thunkAPI.rejectWithValue("데이터 전송 실패")
      }
    }
)

//Delete 방식

export const fetchDeleteEmployeeInfo = createAsyncThunk<number, number, {rejectValue: string}> (
    "employeeApi/fetchDeleteEmployeeInfo",
    async (id, thunkAPI) => {
      const mutation = `
                      mutation deleteEmployee($id: Int!) {
                      deleteEmployee(id: $id) }
                      `

      try{


        const response = await axios.post<GraphQLResponse<{deleteEmployee: number} >>(GRAPH_URL, {
          query: mutation,
          variables : { id }
        });
        console.log("delete 정상 진입", response);

        if(response.data.errors?.length) return thunkAPI.rejectWithValue("GraphQL error");

        console.log(response.data.data);
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
      const mutation = `
                      mutation updateEmployee($id: Int!, $input: EmployeeInput!) {
                      updateEmployee(id:$id, input: $input) {
                        id
                        name
                        age
                        job
                        language
                        pay
                      }
                    }
                      `
      try {
        const response = await axios.post<GraphQLResponse<{updateEmployee:EmployeeInfo}>>(GRAPH_URL, {
          query : mutation,
          variables : {
            id: Number(emp.id),
            input: {
              name: emp.name,
              age: Number(emp.age),
              job: emp.job,
              language: emp.language,
              pay: Number(emp.pay)
            }
          }
        });
        if(response.data.errors?.length) return thunkAPI.rejectWithValue("GraphQL error");

        return response.data.data.updateEmployee;
      } catch {
        return thunkAPI.rejectWithValue("데이터 수정 실패")
      }
    }
)
