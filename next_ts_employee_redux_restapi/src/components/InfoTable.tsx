import React, {useMemo} from 'react';
import {EmployeeInfo} from "@/redux/slice/employeeSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const tableStyle: React.CSSProperties = {
  width: "800px",
  margin: "0 auto",
  borderCollapse: "collapse",
  fontFamily: "Arial, sans-serif",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden",
  tableLayout: "fixed",
};

const thStyle: React.CSSProperties = {
  backgroundColor: "#f2f2f2",
  color: "#333",
  padding: "12px 15px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "0.9em",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 15px",
  borderBottom: "1px solid #eee",
  textAlign: "left",
  color: "#555",
};


const boxStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  padding: "20px",
  fontWeight: "bold",
  border: "1px solid #ddd",
}

const InfoTable = () => {
  const {infos, selectedId} = useSelector((state : RootState) => state.emp);
  //const dispatch = useDispatch();

  const infoObject: EmployeeInfo | undefined  = useMemo(()=>
      infos.find(info => info.id === selectedId), [selectedId, infos]);

  // const info2 = infos.filter(info => info.id === selectedId); //리스트(배열)에 담아서 던지므로 info2[0] 으로 던져야 한다.

  if(!infoObject) return <div style={boxStyle}>선택된 정보가 없습니다.</div>;

  return (
      <table style={tableStyle}>
        <thead>
        <tr>
          { Object.keys(infoObject).filter((entry) => entry !== "id")
              .map((entry) => (<th key={entry}>{entry}</th>))}
        </tr>
        </thead>

        <tbody>
        <tr>
          {Object.values(infoObject).filter((_, idx) => idx !== 0)
              .map((value) => (<td key={value}>{value}</td>))}
        </tr>
        </tbody>
      </table>
  );
};

export default InfoTable;