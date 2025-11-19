import React,{useState} from 'react';
import {EmployeeInfo} from "@/redux/slice/employeeSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootState} from "@/redux/store";
import {fetchPostEmployeeInfo} from "@/redux/api/employeeAPI";


const Register = () => {

  const dispatch = useDispatch<RootDispatch>();

  const initialInfo : EmployeeInfo = {
    id : 0,
    name : "",
    age: 0,
    job : "",
    language: "",
    pay: 0
  }
  const [info, setInfo] = useState<EmployeeInfo>(initialInfo);

  const {infos} = useSelector((state: RootState) => state.emp);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const{name, value} = e.target;
    setInfo((prev) => ({...prev, [name]: value }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!info.name){
      alert("이름은 필수입니다.")
      return;
    }
    if (!info.age || Number(info.age)<0){
      alert("나이는 필수입니다.")
      return;
    }
    if (!info.pay || Number(info.pay)<0){
      alert("급여는 필수입니다.")
      return;
    }

    if (infos.some(item => item.name === info.name)){
      alert("이미 존재하는 이름입니다.")
      return;
    }
    const nextId = infos.length ? Math.max(...infos.map((i) => i.id)) + 1 : 1;
    //setInfos(prev => ([...prev, {...obj, id:nextId}]))
    // infos = [...infos, {...info, id: nextId}];

    // 얘는 API 호출
    dispatch(fetchPostEmployeeInfo(info));

    setInfo(initialInfo);
  }

  return (
      <div className="w-1/4 mx-auto p-6 bg-white shadow-md rounded-md border">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold mb-1">Name</label>
            <input
                name="name"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={info.name}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="age" className="font-semibold mb-1">Age</label>
            <input
                name="age"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={info.age}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="job" className="font-semibold mb-1">Job</label>
            <input
                name="job"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={info.job}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="language" className="font-semibold mb-1">Language</label>
            <input
                name="language"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={info.language}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pay" className="font-semibold mb-1">Pay</label>
            <input
                name="pay"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={info.pay}
            />
          </div>

          <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>


  );
};

export default Register;