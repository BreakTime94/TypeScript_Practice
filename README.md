# TypeScript + React Test1 📅 251117

- Type Script를 통한 props 전달 방법 및 React 와의 차이점 check -> child component에서 안전하게 type 또는 interface를 선언해 자료형을 명시해서 받아야 한다.
- Hello World 작성
- 간단 코딩테스트(사전 테스트)

# TypeScript + React Test2 📅 251118
- CRUD중 (Create와 Update 작성)
- ESLint 억제하는 법(// eslint-disable-next-line react-hooks/set-state-in-effect)
- [...prev]와 같은 spread 연산자, 구조분해 등의 개념 리마인드 (const {name, value} = evente.target)
- 배열을 다루는 filter, find, map 등 활용(filter는 조건에 맞는 값을 똑같은 배열로 반환, find는 담겨져있던 값 그 자체로, map도 배열로 반환) 

# TypeScript + React Test3 📅 251119
- Delete, Reset 기능 추가(Main에서 handleMode 함수로 조정)
- 그 밖의 유효성 검증 및 등등 조정
- useContext 활용한 React 프로젝트로 변경 및 확장

# TypeScript + React(UseContext) 📅 251119
- Create Context로 전역에 관리할 state, function 값 생성
- useEmployee 커스텀 훅 작성 및 이를 통한, 개별 전역 상태 & 함수 값 접근
- 초기값 대입을 위해서 interface나 type 설정시 | 를 통하여 관리

# TypeScript + React(Redux) 📅 251119
- employSlice 작성(useContext에서 사용했던, 초기값, 함수들 정리해서 push)
- export default와 export를 활용해서 reducer랑, 개별 함수 action 설정
- store는 Configure를 이용하여 reducer 설정(emp 등 default 값은 변수명 변경 가능), Providers에는 store에 있는 값 setting
- store에서 RootState, RootDispatch 설정, useSelector, useDispatch를 활용해서 정리 (R)

# TypeScript + React(Redux + RestAPI) 📅 251119
- 별도 json 파일로 slice에 있던 초기값 이동 (Json 형태로 저장)
- createAsyncThunk 의 <> 제네릭 값, 파라미터 설정을 통한 API.ts 파일 구성
- async-await try catch로 인한 에러 분기처리
- slice에 extraReducers를 이용하여 -> builder.addCase를 통해 관련 API 설정