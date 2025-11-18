'use client'
import React, {useMemo, useState} from 'react';
import EmployeeList from "@/components/EmployeeList";
import Register from "@/components/Register";
import Upgrade from "@/components/Upgrade";

export const buttonBarStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  padding: "20px",
}

export type EmployeeInfo = { // 일종의 class와 유사 schema 구조와 유사
  id: number;
  name: string;
  age: number | string;
  job: string;
  language: string;
  pay: number | string;
}
//Fact Table
export const initialTotal: EmployeeInfo[] = [
  {id: 1, name: 'John', age: 35, job: "frontend", language: "react", pay: 1},
  {id: 2, name: 'Peter', age: 35, job: "frontend", language: "react", pay: 1},
  {id: 3, name: 'Sue', age: 35, job: "frontend", language: "react", pay: 1},
  {id: 4, name: 'Susan', age: 35, job: "frontend", language: "react", pay: 1},
]

//register인지 upgrade인지 관리하는 type

export type Mode = "" | "register" | "upgrade" | "delete" | "reset";

const initialEmpInfo: EmployeeInfo = {id: 1, name: 'John', age: 35, job: "frontend", language: "react", pay: 1}

// const test = ["John", "Peter", "Sue", "Susan"];

const Main = () => {
  const [infos, setInfos] = useState<EmployeeInfo[]>(initialTotal); //table에 varchar(동적 할당과 유사)
  const [info, setInfo] = useState<EmployeeInfo>(initialEmpInfo);
  const [selectedId, setSelectedId] = useState<number>(0);
  const[mode, setMode] = useState<Mode>("");

  const modes = useMemo(()=> [ {id: "register" as const, label: "register"},
    {id: "upgrade" as const, label: "upgrade"},
    {id: "delete" as const, label: "delete"},
    {id: "reset" as const, label: "reset"} ], []);

  const handleMode = (mod : Mode) => {
    setMode(mod);
  }

  const handleSelectedId = (id: number) => {
    setSelectedId(id);
  }

  const handleRegister = (obj: EmployeeInfo) => {
    console.log(obj);
    const nextId = infos.length ? Math.max(...infos.map(info => info.id)) + 1 : 1;
    setInfos((prev) => ([...prev, {...obj, id: nextId}]));
  }

  const handleUpgrade = (obj: EmployeeInfo) => {
    console.log(obj)
    setInfos((prev) => (prev.map((info)=> info.id === obj.id ? obj : info))
    );
  }

  return (
      <>
        <div>
          <EmployeeList
              infos={infos}
              selectedId={selectedId}
              handleSelectedId = {handleSelectedId}
              handleMode={handleMode}
          />
        </div>
        <div style={buttonBarStyle}>
          {modes.map((mode) => (
              <button key={mode.id} onClick={() => handleMode(mode.id)}>{mode.label}</button>
          ))}
        </div>
        <div>
          {mode === "register" && (<Register handleRegister={handleRegister}/>)}
          {mode === "upgrade" && <Upgrade handleUpgrade={handleUpgrade} infos={infos} selectedId={selectedId}/>}
        </div>
      </>
  );
};

export default Main;