import React, { useState, useEffect } from "react";
import { getMedicinesAction } from "../../../actions/medicines";
import { connect } from "react-redux";
import MedicineCard from "../../../Common/MedicineCard";
const ViewMedicines = ({ user, getMedicineAction, history }) => {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        getMedicines();
    }, []);
    const getMedicines = () => {
        console.log("getting medicines");
        getMedicineAction(user._id, (res) => {
            if (!res.error)
                setMedicines(res.data);
        });
    }
    return (
        <div className="d-flex flex-row flex-wrap">
            {
                medicines.map((e) => {
                    return (
                        <div key={e._id} className="d-flex m-2">
                            <MedicineCard
                                name={e.name}
                                category={e.category}
                                formula={e.formula}
                                antibiotic={e.antibiotic}
                                goToAddStocks={() => {
                                    history.push("/stocks/add");
                                }}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
};


const mapStateToProps = ({ Register, Login }) => ({
    isLoading: Register.isLoading,
    error: Register.error,
    user: Login.user,
});

const mapDispatchToProps = {
    getMedicineAction: getMedicinesAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewMedicines);