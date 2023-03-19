import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const MedicineCard = ({ name, description, category, formula, antibiotic, goToAddStocks = () => { } }) => {
    return (
        <Card style={{ width: 300 }}>
            <CardImg className={"mt-3 mb-3"} style={{ objectFit: "contain" }} top width="150px" height="75px" src={require("../assets/images/medichain.png")} alt="Card image cap" />
            <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardSubtitle>
                    {antibiotic ? "Antibiotic" : "Non-Antibiotic"} - {category} - {formula}
                </CardSubtitle>
                <CardText style={{ height: 50 }}>{description || <i>No Description</i>}</CardText>
                <Button onClick={goToAddStocks}>Add Stocks</Button>
            </CardBody>
        </Card>
    );
};

export default MedicineCard;