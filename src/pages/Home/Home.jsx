import React from "react";
import styles from "../../styles/pages/Home/home.module.css";
import Header from "../../components/PageHeader/Header";
import { Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
function Home() {
  const [ispaymentModalOpen, setPaymentModalOpen] = useState(false);
  
  const handleModalOpen = () => {
    setPaymentModalOpen(true);
  };
  return (
    <div className={styles.parentDiv}>
      <Header heading="Home" />
      <div className={styles.container}>
        {/* <div className={styles.payment}>
          <h2>Initiate New Payment</h2>
          <button onClick={handleModalOpen}>Initiate</button>
        </div> */}
        <h1>Welcome</h1>
      </div>
      <Modal
        open={ispaymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        className={styles.modal}
      >
        <div className={styles.mainbox}>
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            type="number"
          />
          <TextField
            id="outlined-basic"
            label="Mobile Number"
            variant="outlined"
            type="number"
          />
          <TextField id="outlined-basic" label="Full Name" variant="outlined" />
          <Button>Generate</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
