import Header from "../../../components/PageHeader/Header";
import styles from "../../../styles/pages/Agent/viewAgent.module.css";
import TableComponent from "./Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
        const response = await axios.get(`${safalBackend}/agent/all`, {withCredentials: true});
        if (response.data.success) {
          setAllData(response.data?.data);
        }
      } catch (error) {
        if(error.response?.data?.message){
          toast.error(error.response.data.message);
        }else{
          toast.error("Error while fetching agents. Please try again later");
        }
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    const rows = allData.map((Agent) => {
      console.log(Agent);
      const obj = {
      }
      obj.name = `${Agent?.firstName} ${Agent?.lastName}`;
      obj.phone = Agent?.phone;
      obj.pannumber = Agent?.panNumber;
      obj.id = Agent?._id;
      return obj;
    });
    setRows(rows);
  }, [allData])

  const columns = [
    "Name", "Phone", "PanNumber", "Action"
  ];
  const serachFunction = async (searchStr) => {

    try {
      const response = await axios.post(`${safalBackend}/agent/search`, {
        "searchQuery": searchStr
      }, { withCredentials: true });
      if (response.data.success) {
        setAllData(response.data.data);
      }
    } catch (error) {
      if(error.response?.data?.message){
        toast.error(error.response.data.message);
      }else{
        toast.error("Error while fetching agents. Please try again later");
      }
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
      </div>
    </div>
  )
}


export default ViewAgents