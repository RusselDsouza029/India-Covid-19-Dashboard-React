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
            .then(function (response) {
                console.log(response.data.states);
                setData(response.data.states);

                // total data
                setTotalData(response.data.total)
            })
            .catch(function (error) {
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
            <Card className='card' border="primary" style={{ width: '18rem' }}>
                <Card.Header>Total Active</Card.Header>
                <Card.Body>
                    <Card.Text
                    style={{
                        fontSize: 40,
                    }}>
                       {totalData.active}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className='card' border="success" style={{ width: '18rem' }}>
                <Card.Header>Total Cases</Card.Header>
                <Card.Body>
                    <Card.Text
                    style={{
                        fontSize: 40,
                    }}>
                    {totalData.cases}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className='card' border="danger" style={{ width: '18rem' }}>
                <Card.Header>Total Deaths</Card.Header>
                <Card.Body>
                    <Card.Text
                    style={{
                        fontSize: 40,
                    }}
                    >
                        {totalData.deaths}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className='card' border="dark" style={{ width: '18rem' }}>
                <Card.Header>Total Recovered</Card.Header>
                <Card.Body>
                    <Card.Text
                    style={{
                        fontSize: 40,
                    }}
                    >
                    {totalData.recovered}
                    </Card.Text>
                </Card.Body>
            </Card>
            </Container>
            <Paper
                sx={{
                    overflow: 'hidden',
                    m: 10,
                }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow align='justify'>
                                <TableCell align="justify"><b>States</b></TableCell>
                                <TableCell align="justify"><b>Active</b></TableCell>
                                <TableCell align="justify"><b>Cases</b></TableCell>
                                <TableCell align="justify"><b>Deaths</b></TableCell>
                                <TableCell align="justify"><b>Recovered</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((showData, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="justify" className='positive_color'>{showData.state}</TableCell>
                                        <TableCell align="justify" className='positive_color'>{showData.active}</TableCell>
                                        <TableCell align="justify" className='positive_color'>{showData.cases}</TableCell>
                                        <TableCell align="justify" className='negative_color'>{showData.deaths}</TableCell>
                                        <TableCell align="justify" className='positive_color'>{showData.recovered}</TableCell>
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