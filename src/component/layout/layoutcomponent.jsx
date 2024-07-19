import "./layout.css";
import logo from "../../assets/Logo.png";
import loads from "../../assets/svg/loads.svg";
import statements from "../../assets/svg/statements.svg";
import transaction from "../../assets/svg/transaction.svg";
import loggout from "../../assets/svg/loggout.svg";
import style from "./layout.css";

import balnce from "../../assets/balnce.png";
import SelectLabels from "../../shared/selectBox";
import { useEffect, useState } from "react";
import Table from "../../shared/table";

export default function LayoutComponent() {
  const [companyData, setCompnyData] = useState([]);
  const [companyName, setCompnyName] = useState("");
  const [accountData, setAccountData] = useState([]);
  const [accountNameData, setAccountNameData] = useState([]);
  const [tableData, settableData] = useState([]);
  const columns = ["Date", "Credit", "A/c Balance", "UTR/RRN", "A/c No /UPI"];

  useEffect(() => {
    getCompanyName();
  }, []);

  async function getCompanyName() {
    try {
      const response = await fetch("http://localhost:8000/companyName");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCompnyData(data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getCompanyAccount(companyName);
  }, [companyName]);

  async function getCompanyAccount(id) {
    try {
      const response = await fetch(`http://localhost:8000/account/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAccountData(data.data);
    } catch (error) {}
  }

  console.log("comnm", companyData);

  return (
    <div className="sidebar-content">
      <div className="sidebar">
        <a className="active" href="#home">
          <img src={logo} alt="" />
        </a>
        <a href="/" id="loads">
          <img src={loads} alt="" />{" "}
          <span style={{ marginLeft: "2px" }}>Loads</span>
        </a>
        <a href="/" id="statement">
          <img src={statements} alt="" /> <span>Statements</span>
        </a>
        <a href="/" id="transaction">
          <img src={transaction} alt="" /> <span>Transactions</span>
        </a>
        <a href="/" id="logout">
          <img src={loggout} alt="" /> <span>Logout</span>
        </a>
      </div>

      <div className="content">
        {/* selelction */}
        <div className="selectBox">
          <SelectLabels
            value={companyName}
            setValue={setCompnyName}
            data={companyData}
            label="Company Name"
          />
          <SelectLabels
            value={accountNameData}
            setValue={setAccountNameData}
            data={accountData}
            label="Account Name"
          />
        </div>
        {/* card  */}
        <div className="cardcontainer">
          <div className="card">
            <img src={balnce} alt="Balance" height={66}/>
            <div className="textCantainer">
              <h5 className="">Available balance</h5>
              <p className="cardText">₹ 88888,88,88</p>
            </div>
          </div>
        </div>
        {/* table  */}
        <main>
          <p>Latest Loads are displayed here</p>
          <br />
          <Table columns={columns} data={accountNameData} />
        </main>
      </div>
    </div>
  );
}
