'use client'
import React, {useContext} from 'react';
import {useEmployee} from "@/context/EmployeeContext";
import InfoTable from "@/components/InfoTable";
import {buttonBarStyle} from "./Main";


const EmployeeList = () => {

  const {infos, selectedId, handleSelectedId, handleMode} = useEmployee();

  return (
      <>
        <div style={buttonBarStyle}>
          {infos?.map((info) => (<button
              key={info.id}
              onClick={() => {
                handleSelectedId(info.id)
                handleMode(``);
              }}
          >{info.name}</button>))}
        </div>
        <InfoTable />
      </>
  );
};

export default EmployeeList;