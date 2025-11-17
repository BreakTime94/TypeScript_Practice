'use client'
import React, {useState} from 'react';
import EmployeeList from "@/components/EmployeeList";

export type EmployeeInfo = { // 일종의 class와 유사 schema 구조와 유사
  id: number;
  name: string;
  age: number | string;
  job: string;
  language: string;
  pay: number | string;
}
export const initialState: EmployeeInfo[] = [
  {id: 1, name: 'John', age: 35, job: "frontend", language: "react", pay: 1},
  {id: 2, name: 'Peter', age: 35, job: "frontend", language: "react", pay: 1},
  {id: 3, name: 'Sue', age: 35, job: "frontend", language: "react", pay: 1},
  {id: 4, name: 'Susan', age: 35, job: "frontend", language: "react", pay: 1},
]
const initialEmpInfo: EmployeeInfo = {id: 1, name: 'John', age: 35, job: "frontend", language: "react", pay: 1}

// const test = ["John", "Peter", "Sue", "Susan"];

const Main = () => {
  const [infos, setInfos] = useState<EmployeeInfo[]>(initialState); //table에 varchar(동적 할당과 유사)
  const [info, setInfo] = useState<EmployeeInfo>(initialEmpInfo);
  return (
      <div>
        <EmployeeList information={infos}/>
      </div>
  );
};

export default Main;