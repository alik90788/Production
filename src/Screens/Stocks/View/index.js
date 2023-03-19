import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StockCard from "../../../Common/StockCard";
import { getStocksAction } from "../../../actions/stocks";

const ViewStocks = ({ user, getStocksAction }) => {

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        getStocks();
    }, []);
    const getStocks = () => {
        console.log("getting stocks");
        getStocksAction(user._id, (res) => {
            console.log(res, 'res');
            if (!res.error)
                setMedicines(res.data);
        });
    };

    return (
        <div>
            <div>
                <h2>Your Stocks</h2>
            </div>
            <div className="d-flex flex-row flex-wrap">

                {
                    medicines.map((e) => {
                        return (
                            <div key={e._id} className="d-flex m-2">
                                <StockCard
                                    name={e.medicine.name}
                                    units={e.units}
                                    price={e.price}
                                    manDate={e.manDate}
                                    expiryDate={e.expiry}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};


const mapStateToProps = ({ Register, Login }) => ({
    isLoading: Register.isLoading,
    error: Register.error,
    user: Login.user,
});

const mapDispatchToProps = {
    getStocksAction: getStocksAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewStocks);