import React from 'react';
import {EmployeeInfo} from "@/components/Main";
import InfoTable from "@/components/InfoTable";
import {buttonBarStyle} from "./Main";
import {Mode} from "./Main";
const buttonStyles : React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 3,
  border: "1px solid #ccc",
}

// const buttonBarStyle: React.CSSProperties = {
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: "16px",
//   padding: "20px",
// }

interface EmployeeInfoProps {
  infos : EmployeeInfo[];
  handleSelectedId: (id: number) => void;
  selectedId: number;
  handleMode: (mode: Mode) => void;
}

const EmployeeList = ({infos, handleSelectedId, selectedId, handleMode}: EmployeeInfoProps) => {
  return (
      <>
        <div style={buttonBarStyle}>
          {infos?.map((info) => (<button
              key={info.id}
              onClick={() => {
                handleSelectedId(info.id)
                handleMode("");
              }}
          >{info.name}</button>))}
        </div>
        <InfoTable infos={infos} selectedId={selectedId} />
      </>
  );
};

export default EmployeeList;