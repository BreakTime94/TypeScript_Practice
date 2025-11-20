'use client'
import React, {useEffect} from 'react';
import InfoTable from "@/components/InfoTable";
import {buttonBarStyle} from "./Main";
import {useDispatch, useSelector} from "react-redux";
import {handleSelectedId, handleMode} from "@/redux/slice/employeeSlice";
import {RootDispatch, RootState} from "@/redux/store";
import {fetchGetEmployeeInfos, fetchPostEmployeeInfo} from "@/redux/api/employeeAPI";

const EmployeeList = () => {

  const {infos, mode} = useSelector((state : RootState) => state.emp);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(fetchGetEmployeeInfos());
  }, [dispatch]);

  useEffect(() => {
    if(mode === "reset") {
      infos.map(info => dispatch(fetchPostEmployeeInfo(info)));
    }
  }, [dispatch, mode]);

  return (
      <>
        <div style={buttonBarStyle}>
          {infos?.map((info) => (<button
              key={info.id}
              onClick={() => {
                dispatch(handleSelectedId(info.id));
                dispatch(handleMode(``));
              }}
          >{info.name}</button>))}
        </div>
        <InfoTable />
      </>
  );
};

export default EmployeeList;