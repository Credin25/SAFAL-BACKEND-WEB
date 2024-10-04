// import GreyButton from "../../../components/Buttons/GreyButton"
// import BlueButton from "../../../components/Buttons/BlueButton"
import Header from "../../../components/PageHeader/Header";
import styles from "../../../styles/pages/Agent/viewAgent.module.css";
import TableComponent from "./Table";
import { useEffect, useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import EditButton from "../../../components/Buttons/EditButton";
import FullWidthTextField from "../../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { safalBackend } from "../../../constants/apiRoutes";
function ViewAgents() {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${safalBackend}/agent/all`);
        if (response.data.success) {
          setAllData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    const rows = allData.map((Agent) => {
      console.log(Agent);
      const obj = {
      }
      obj.name = `${Agent.firstName} ${Agent.lastName}`;
      obj.phone = Agent.phone;
      obj.pannumber = Agent.panNumber;
      obj.aadharnumber = Agent.aadharNumber;
      obj.voterid = Agent.voterId;
      obj.id = Agent._id;
      return obj;
    });
    setRows(rows);
  }, [allData])

  const columns = [
    "Name", "Phone", "PanNumber", "aadharNumber", "voterId", "Action"
  ];
  const serachFunction = async (searchStr) => {

    try {
      const response = await axios.post(`${safalBackend}/agent/search`, {
        "searchQuery": searchStr
      });
      if (response.data.success) {
        setAllData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewAgent = () => {
    navigate("/createAgent")
  }
  return (
    <div className={styles.parentDiv}>
      <Header heading="All Agents" />
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <FullWidthTextField placeholder="Search By Phone Number / Pan Number / Name" onSearch={serachFunction} />
          <div>
            <EditButton text="New Agent" onClickFunction={addNewAgent} />
          </div>

        </div>

        <TableComponent rows={rows} headers={columns} />
        {/* <div className={styles.buttonDiv}>
          <GreyButton text="Back" onClickFunction={() => { }} />
          <div className={styles.pageDiv}>
            <BlueButton text="Previous" onClickFunction={() => { }} />
            <span className={styles.pageNo}>1</span>
            <BlueButton text="Next" onClickFunction={() => { }} />
          </div>
        </div> */}

      </div>
    </div>
  )
}


export default ViewAgents