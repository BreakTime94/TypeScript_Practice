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
    if(mod === "delete"){
      if(!selectedId){
        alert("직원을 선택해 주세요!");
        return;
      }

      const targetObj = infos.find(x => x.id === selectedId);

      if(!targetObj){
        alert("해당 직원을 찾을 수 없습니다.");
        return;
      }

      if(!confirm(`${targetObj?.name} 직원을 정말 삭제하시겠습니까?`)) return;

      setInfos((prev) => prev.filter(item => item.id !== selectedId));
      setMode('');
      setSelectedId(0);

      return;
    }

    if(mod === `reset`) {
      if(!confirm(`목록을 초기 데이터로 되돌릴까요?`)) return;

      setInfos(initialTotal);
      setMode('');
      setSelectedId(0);

      return;
    }

    if(mod === "upgrade"){
      alert(`수정할 직원을 먼저 선택해 주세요!`);
      return;
    }

    setMode(mod);
  }

  const handleSelectedId = (id: number) => {
    setSelectedId(id);
  }

  const handleRegister = (obj: EmployeeInfo) => {
    console.log(obj);
    const nextId = infos.length ? Math.max(...infos.map(info => info.id)) + 1 : 1;

    if(!obj.name) {
      alert("이름은 필수입니다.");
      return;
    }

    if(!obj.age || Number(obj.age) < 0) {
      alert("나이는 필수입니다.");
      return;
    }

    if(!obj.pay || Number(obj.pay) < 0) {
      alert("급여는 필수입니다.");
      return;
    }

    if(infos.some(item => item.name === obj.name)) {
      alert("이미 존재하는 이름입니다.");
      return;
    }

    setInfos((prev) => ([...prev, {...obj, id: nextId}]));
  }

  const handleUpgrade = (obj: EmployeeInfo) => {
    console.log(obj)
    if(Number(obj.age) < 0) {
      alert(`나이는 0 이상입니다.`)
      return;
    }
    if(Number(obj.pay) < 0) {
      alert(`급여는 0 이상입니다.`)
      return;
    }

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