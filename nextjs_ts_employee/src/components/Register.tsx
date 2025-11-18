import React,{useState} from 'react';
import events from "node:events";
import {EmployeeInfo} from "@/components/Main";

// const formStyle: React.CSSProperties = {
//   display: 'flex',
//   flexDirection: 'column',
//   width: '300px',
//   margin: '20px auto',
//   padding: '20px',
//   border: '1px solid #ccc',
//   borderRadius: '10px',
//   backgroundColor: '#f9f9f9',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// };
//
// const labelStyle: React.CSSProperties = {
//   marginBottom: '10px',
//   display: 'flex',
//   flexDirection: 'column',
//   fontWeight: 'bold',
//   color: '#333',
// };
//
// const inputStyle: React.CSSProperties = {
//   padding: '8px',
//   borderRadius: '5px',
//   border: '1px solid #ccc',
//   fontSize: '14px',
// };

interface RegisterProps {
  handleRegister: (obj: EmployeeInfo) => void;
}

const Register = ({handleRegister}: RegisterProps) => {
  const initialInfo : EmployeeInfo = {
    id : 0,
    name : "",
    age: 0,
    job : "",
    language: "",
    pay: 0
  }
  const [infos, setInfos] = useState<EmployeeInfo>(initialInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const{name, value} = e.target;
    setInfos((prev) => ({...prev, [name]: value }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister(infos);
    setInfos(initialInfo);
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
                value={infos.name}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="age" className="font-semibold mb-1">Age</label>
            <input
                name="age"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={infos.age}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="job" className="font-semibold mb-1">Job</label>
            <input
                name="job"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={infos.job}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="language" className="font-semibold mb-1">Language</label>
            <input
                name="language"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={infos.language}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pay" className="font-semibold mb-1">Pay</label>
            <input
                name="pay"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={infos.pay}
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