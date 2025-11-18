import React, {useEffect, useMemo, useState} from 'react';
import type {EmployeeInfo} from "@/components/Main";

interface UpgradeProps {
  handleUpgrade: (obj: EmployeeInfo) => void;
  infos: EmployeeInfo[];
  selectedId: number;
}

const Upgrade = ({handleUpgrade, infos, selectedId} : UpgradeProps) => {
  const [upInfo, setUpInfo] = useState<EmployeeInfo>({
    id : 0,
    name : "",
    age: 0,
    job : "",
    language: "",
    pay: 0
  });

  const initInfo : EmployeeInfo | undefined = useMemo(() => {
    return infos.find((info) => info.id === selectedId);
  }, [infos, selectedId])

  useEffect(() => {

    if(initInfo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUpInfo(initInfo);
    }
  }, [selectedId]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const{name, value} = e.target;
    setUpInfo((prev) => ({...prev, [name]: value }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpgrade(upInfo);
  }

  return (
      <div className="w-1/4 mx-auto p-6 bg-white shadow-md rounded-md border">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold mb-1">Name</label>
            <input
                name="name"
                disabled
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={upInfo.name}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="age" className="font-semibold mb-1">Age</label>
            <input
                name="age"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={upInfo.age}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="job" className="font-semibold mb-1">Job</label>
            <input
                name="job"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={upInfo.job}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="language" className="font-semibold mb-1">Language</label>
            <input
                name="language"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={upInfo.language}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pay" className="font-semibold mb-1">Pay</label>
            <input
                name="pay"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={upInfo.pay}
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

export default Upgrade;