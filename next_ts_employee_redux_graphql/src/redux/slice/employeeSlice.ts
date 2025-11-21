import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import{fetchDeleteEmployeeInfo, fetchGetEmployeeInfos, fetchPostEmployeeInfo, fetchPutEmployeeInfo} from "@/redux/api/employeeAPI";
import {useDispatch} from "react-redux";

export type EmployeeInfo = {
  id: number;
  name: string;
  age: number | string;
  job: string;
  language: string;
  pay: number | string;
}

//mode data
const modes: ModeItem[] = [
  {id:"register" as Mode, label:"register" as string},
  {id:"upgrade" as Mode, label:"upgrade" as string},
  {id:"delete" as Mode, label:"delete" as string},
  {id:"reset"as Mode, label:"reset" as string}
]

export type Mode = "" | "register" | "upgrade" | "delete" | "reset"

interface ModeItem {
  id: Mode;
  label: string;
}

interface EmployeeStateType {
  modes: ModeItem[];
  mode: Mode;
  infos: EmployeeInfo[];
  upInfo: EmployeeInfo | null;
  selectedId: number | null;
  error: string | null;
  loading: boolean;
}

const initialState: EmployeeStateType= {
  mode: '',
  modes,
  infos: [
    {
      "id": 1,
      "name": "John",
      "age": 35,
      "job": "frontend",
      "language": "react",
      "pay": 1
    },
    {
      "id": 2,
      "name": "Peter",
      "age": 35,
      "job": "frontend",
      "language": "react",
      "pay": 1
    },
    {
      "id": 3,
      "name": "Sue",
      "age": 35,
      "job": "frontend",
      "language": "react",
      "pay": 1
    },
    {
      "id": 4,
      "name": "Susan",
      "age": 35,
      "job": "frontend",
      "language": "react",
      "pay": 1
    }
  ],
  upInfo: null,
  selectedId: 0,
  error: null,
  loading: false,
}

//Action Reducers 설정

const handleModeReducer = (
    state: EmployeeStateType, action: PayloadAction<Mode>) => {

  const mod = action.payload;
  //const selectedId = state.selectedId;
  const infos = state.infos;


  if(mod === "delete"){
    if(!state.selectedId){
      alert("직원을 선택해 주세요!!!")
      return;
    }
    const targetObj = infos.find(x => x.id === state.selectedId)
    if(!targetObj){
      alert("해당 직원을 찾을 수 없습니다.")
      return;
    }
    if(confirm(`${targetObj.name} 직원을 삭제할까요?`)){
      //setInfos(prev => prev.filter(item => item.id !== selectedId))

      // state.infos = infos.filter(x => x.id !== state.selectedId);

      // state.infos = [...infos].filter(x => x.id !== selectedId); 안정빵을 하려면 spread 연산자를 써서 복제해버리는 방법이 있다.

      state.mode = "delete";
      // state.upInfo = null;
      // state.selectedId = null;
    }
    return;
  }
  if(mod === 'reset'){
    if(confirm("목록을 초기 데이터로 되돌릴까요?")){
      state.infos = initialState.infos;
      state.mode = "reset";
      state.upInfo = null;
      state.selectedId = null;
    }
    return;
  }
  if(mod === "upgrade"){
    if(!state.selectedId){
      alert("수정할 직원을 먼저 선택해 주세요!!")
      return;
    }
  }
  state.mode = mod;
}

const handleSelectedIdReducer = (
    state : EmployeeStateType, action: PayloadAction<number>
) =>{

  console.log("id", state.selectedId)

  const id = action.payload;

  // setSelectedId(state.selectedId); 고치기 전 (context)

  state.selectedId = id; // 고친 후 (redux) useState 등의 훅을 전혀 사용하지 않는다.

  //고치기 전
  // const found: EmployeeInfo | null =
  //     infos.filter(info => info.id === id)[0] ?? null;
  // setUpInfo(found);

  //고친 후 (특정 info 하나만 픽하는 것)
  state.upInfo = state.infos.filter(info => info.id === id)[0] ?? null;
}

// const handleRegisterReducer = (state: EmployeeStateType,
//                                action: PayloadAction<EmployeeInfo>
// ) => {
//   const obj = action.payload;
//
//   if (!obj.name){
//     alert("이름은 필수입니다.")
//     return;
//   }
//   if (!obj.age || Number(obj.age)<0){
//     alert("나이는 필수입니다.")
//     return;
//   }
//   if (!obj.pay || Number(obj.pay)<0){
//     alert("급여는 필수입니다.")
//     return;
//   }
//
//   if (state.infos.some(item => item.name === obj.name)){
//     alert("이미 존재하는 이름입니다.")
//     return;
//   }
//   const nextId = state.infos.length ? Math.max(...state.infos.map((i) => i.id)) + 1 : 1;
//   //setInfos(prev => ([...prev, {...obj, id:nextId}]))
//   state.infos = [...state.infos, {...obj, id: nextId}];
// }

// const handleUpgradeReducer = (state: EmployeeStateType,
//                        action: PayloadAction<EmployeeInfo>) => {
//
//   const obj = action.payload;
//
//   if (Number(obj.age)<0){
//     alert("나이는 0 이상입니다.")
//     return;
//   }
//   if (Number(obj.pay)<0){
//     alert("급여는 0 이상입니다.")
//     return;
//   }
//
//   state.infos = [...state.infos].map((item) => item.id === obj.id ? {...item,
//     age: obj.age,
//     job: obj.job,
//     language: obj.language,
//     pay: obj.pay,
//   } : item)
//
//   // setInfos(prev => prev.map(item =>
//   //     item.id === obj.id ?
//   //         {...item,
//   //           age: obj.age,
//   //           job: obj.job,
//   //           language: obj.language,
//   //           pay: obj.pay,
//   //         } : item
//   // ));
//
//   state.mode = "";
//
//   //setMode('')
// }

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {
    handleMode: handleModeReducer,
    handleSelectedId: handleSelectedIdReducer,
    //handleRegister: handleRegisterReducer,
    //handleUpgrade: handleUpgradeReducer
  },
  extraReducers: (builder) => {
    // 1. 전체 데이터 가져오기(list) Get
    builder
        .addCase(fetchGetEmployeeInfos.pending, (state) => {
          state.loading = true;
          state.error = null;

        })
        .addCase(fetchGetEmployeeInfos.fulfilled, (state, action) => {
          state.loading = false;
          state.infos = action.payload;
          state.mode = "";
          // response.data를 뜻한다. 외부에서 return으로 날라온 데이터임.

        })
        .addCase(fetchGetEmployeeInfos.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ?? "로드 실패";
        })
    // 수정(Modify)
    builder
        .addCase(fetchPutEmployeeInfo.pending, (state, action) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPutEmployeeInfo.fulfilled, (state, action) => {
          state.loading = false;
          state.upInfo = action.payload;
          state.infos = [...state.infos].map(info => info.id === action.payload.id ? action.payload : info);
        })
        .addCase(fetchPutEmployeeInfo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ?? "로드 실패";
        })
    builder
        .addCase(fetchPostEmployeeInfo.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPostEmployeeInfo.fulfilled, (state, action) => {
          state.loading = false;
          state.infos = [...state.infos, action.payload];
          state.mode = '';
        })
        .addCase(fetchPostEmployeeInfo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ?? "로드 실패";
        })
    builder
        .addCase(fetchDeleteEmployeeInfo.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchDeleteEmployeeInfo.fulfilled, (state) => {
          state.loading = false;
          state.error = null;
          state.infos = [...state.infos].filter((info) => info.id !== state.selectedId)
          state.mode = "";
        })
        .addCase(fetchDeleteEmployeeInfo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ?? "로드 실패";
        })
  }
})

export const {handleMode, handleSelectedId} = employeeSlice.actions;

export default employeeSlice.reducer;