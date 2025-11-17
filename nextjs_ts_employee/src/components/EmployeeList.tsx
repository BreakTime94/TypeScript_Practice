import React from 'react';
import {EmployeeInfo, initialState} from "@/components/Main";

interface EmployeeInfoProps {
  information : EmployeeInfo[];
}

const EmployeeList = ({information}: EmployeeInfoProps) => {
  return (
      <div>
        {information.map((employee) => (
            <div key={employee.id}>{employee.name}</div>))}
      </div>
  );
};

export default EmployeeList;