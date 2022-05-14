import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab } from "@mui/material";
import './covid_style.css';
import { Card, Container } from "react-bootstrap";

const Covid_tracker = () => {
    // state data
    const [data, setData] = useState([]);

    // total data in card
    const [totalData, setTotalData] = useState([])
    const covid_data = () => {
        axios.get('https://disease.sh/v3/covid-19/gov/india')
            .then((response) => {
                console.log(response.data.states);
                setData(response.data.states);

                // total data
                setTotalData(response.data.total)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        covid_data();
    }, []);

    return (
        <>
            <br />
            <p className="p_heading"><b>India</b> Covid-19 Dashboard</p>
            <Container className='card_container'>
                <Card className='card' border="primary">
                    <Card.Header className='cardHeader'>Total Active</Card.Header>
                    <Card.Body>
                        <Card.Text
                            className="cardItem"
                        >
                            {totalData.active}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='card' border="success">
                    <Card.Header className='cardHeader'>Total Cases</Card.Header>
                    <Card.Body>
                        <Card.Text
                            className="cardItem"
                        >
                            {totalData.cases}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='card' border="danger">
                    <Card.Header className='cardHeader'>Total Deaths</Card.Header>
                    <Card.Body>
                        <Card.Text
                            className="cardItem"
                        >
                            {totalData.deaths}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='card' border="dark">
                    <Card.Header className='cardHeader'>Total Recovered</Card.Header>
                    <Card.Body>
                        <Card.Text
                            className="cardItem"
                        >
                            {totalData.recovered}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            <Paper
                className='tableContainer'
            >
                <TableContainer
                className='TableContainer'
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow align='justify'>
                                <TableCell align="justify" className="tableHeading"><b>States</b></TableCell>
                                <TableCell align="justify" className="tableHeading"><b>Active</b></TableCell>
                                <TableCell align="justify" className="tableHeading"><b>Cases</b></TableCell>
                                <TableCell align="justify" className="tableHeading"><b>Deaths</b></TableCell>
                                <TableCell align="justify" className="tableHeading"><b>Recovered</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((showData, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="justify" className='positive_color tableHeading'>{showData.state}</TableCell>
                                        <TableCell align="justify" className='positive_color tableHeading'>{showData.active}</TableCell>
                                        <TableCell align="justify" className='positive_color tableHeading'>{showData.cases}</TableCell>
                                        <TableCell align="justify" className='negative_color tableHeading'>{showData.deaths}</TableCell>
                                        <TableCell align="justify" className='positive_color tableHeading'>{showData.recovered}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}

export default Covid_tracker;