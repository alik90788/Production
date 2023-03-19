import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import OrderTable from "../../../Common/OrderTable";
import { getDistributorOrdersAction } from "../../../actions/getDistributorOrders";
import { toast } from "react-toastify";
import { updateDistributorOrdersAction } from "../../../actions/updateDistributorOrder";

const ViewOrders = ({ history, loginAction, user, getDistributorOrdersAction,
    updateDistributorOrdersAction
}) => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOrders();
    }, []);
    const onClick = (status, order) => {
        console.log(status, order, 'status and order');
        updateOrder(status, order);

    }
    const getOrders = () => {
        getDistributorOrdersAction(user._id, (res) => {
            console.log(res, 'res');
            if (res.data)
                setOrders(res.data);
        })
    };
    const updateOrder = (status, order) => {
        order.status = status;
        updateDistributorOrdersAction(order, (res) => {
            console.log(res, 'res in action');
            if (!res.error) {
                getOrders();
                toast(`Order ${status}`);
            } else {
                toast(`Something went wrong`);
            }
        })

    }


    return (
        <Fragment>
            <h3>
                Distributor Orders
            </h3>
            <OrderTable onClick={onClick} orders={orders} />
        </Fragment>
    )
};

const mapStateToProps = ({ Register, Login }) => ({
    isLoading: Register.isLoading,
    error: Register.error,
    user: Login.user,
});

const mapDispatchToProps = {
    getDistributorOrdersAction: getDistributorOrdersAction,
    updateDistributorOrdersAction: updateDistributorOrdersAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewOrders);