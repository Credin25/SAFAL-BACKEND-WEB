import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "../../styles/pages/Insurance/singleinsurance.module.css";
import Header from '../../components/PageHeader/Header';
import { safalBackend } from '../../constants/apiRoutes';
function ViewSingleInsurance() {
    const { id } = useParams();
    const [insuranceInfo, setInsuranceInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchInitialData = async () => {
        try {
            const res = await axios.get(`${safalBackend}/insurance/${id}`);
            if (res.data.success) {
                setInsuranceInfo(res.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching insurance data:', error);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.parentDiv}>
            <Header heading="Insurance Details" />
            <div className={styles.container}>
                <div className={styles.insuranceDetailsWrapper}>
                    <h2>{insuranceInfo?.name}</h2>
                    <p className={styles.details}><strong>Insurance Number:</strong> <span>{insuranceInfo?.insuranceNumber}</span></p>
                    <p className={styles.details}><strong>Date of Birth:</strong> <span>{new Date(insuranceInfo?.dob).toLocaleDateString()}</span></p>
                    <p className={styles.details}><strong>Gender:</strong> <span>{insuranceInfo?.gender}</span></p>
                    <p className={styles.details}><strong>Occupation:</strong> <span>{insuranceInfo?.occupation}</span></p>
                    <p className={styles.details}><strong>Mobile:</strong> <span>{insuranceInfo?.mobile}</span></p>
                    <p className={styles.details}><strong>Email:</strong> <span>{insuranceInfo?.email}</span></p>
                    <p className={styles.details}><strong>Aadhar Number:</strong> <span>{insuranceInfo?.aadharNumber}</span></p>
                    <p className={styles.details}><strong>Address:</strong> <span>{insuranceInfo?.address}</span></p>
                    <p className={styles.details}><strong>Pincode:</strong> <span>{insuranceInfo?.pincode}</span></p>
                    <p className={styles.details}><strong>City:</strong> <span>{insuranceInfo?.city}</span></p>
                    <p className={styles.details}><strong>State:</strong> <span>{insuranceInfo?.state}</span></p>
                    <p className={styles.details}><strong>Country:</strong> <span>{insuranceInfo?.country}</span></p>
                    <h3>Nominee Details</h3>
                    <p className={styles.details}><strong>Nominee Name:</strong> <span>{insuranceInfo?.nomineeDetails?.name}</span></p>
                    <p className={styles.details}><strong>Nominee Gender:</strong> <span>{insuranceInfo?.nomineeDetails?.gender}</span></p>
                    <p className={styles.details}><strong>Nominee Age:</strong> <span>{insuranceInfo?.nomineeDetails?.age}</span></p>
                    <p className={styles.details}><strong>Relationship:</strong> <span>{insuranceInfo?.nomineeDetails?.relationship}</span></p>
                    {insuranceInfo?.nomineeDetails?.isMinor && (
                        <>
                            <p className={styles.details}><strong>Guardian Name:</strong> <span>{insuranceInfo?.nomineeDetails?.guardianName}</span></p>
                            <p className={styles.details}><strong>Guardian Age:</strong> <span>{insuranceInfo?.nomineeDetails?.guardianAge}</span></p>
                            <p className={styles.details}><strong>Guardian Relationship:</strong> <span>{insuranceInfo?.nomineeDetails?.guardianRelationship}</span></p>
                        </>
                    )}
                    <p className={styles.details}><strong>Total Premium Paid:</strong> <span>{insuranceInfo?.totalPremiumPaid}</span></p>
                </div>
            </div>
        </div>
    );
}

export default ViewSingleInsurance;
