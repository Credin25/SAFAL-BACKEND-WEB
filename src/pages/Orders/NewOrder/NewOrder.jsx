import styles from '../../../styles/pages/Orders/createNewOrder.module.css';
import Header from "../../../components/PageHeader/Header";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';

function AddNewOrder() {
    // const navigate = useNavigate();
    const [allAgents, setAllAgents] = useState([]);
    const [agent, setAgent] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/agent/all');
                if (response.data.success) {
                    setAllAgents(response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const handleAgentChange = (e) => {
        setAgent(e.target.value); // Set the selected agent ID
    };
    console.log(setAgent);

    return (
        <div className={styles.parentDiv}>
            <Header heading="Create New Order" />
            <div className={styles.container}>
                <form className={styles.form}>
                    <h2>Choose Agent You want to create order for</h2>
                    <select onChange={handleAgentChange} value={agent}>
                        <option value="" disabled>Select an agent</option>
                        {
                            allAgents.map(agent => (
                                <option key={agent._id} value={agent._id}>
                                    {agent.firstName} {agent.lastName}  {agent?.phone}
                                </option>
                            ))
                        }
                    </select>
                </form>
            </div>
        </div>
    );
}

export default AddNewOrder;
