import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import { Snackbar } from "@mui/material";
import Addcar from "./Addcar";
import Editcar from "./Editcar";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Carlist() {
    const [cars, setCars] = useState([]);
    const [OpenSnackbar, setOpenSnackbar] = useState(false);
    const [MsgSnackbar, setMsgSnackbar] = useState('');

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err))
    }

    const deleteCar = (params) => {
        if (window.confirm("Are you sure")) {
            fetch(params.data._links.car.href, { method: "Delete" })
                .then(response => {
                    if (response.ok) {
                        setMsgSnackbar("The car was deleted succesfully!")
                        setOpenSnackbar(true);
                        getCars();
                    } else {
                        window.alert("Something went wrong with the deletion.")
                        setOpenSnackbar(true);
                    }
                })
                .catch(error => console.error(error))
        }
    }

    const saveCar = (car) => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(response => fetchData())
            .catch(err => console.error(err))
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => fetchData())
        .catch(err => console.error(err))
    }
    const [columnDefs, setColumnDefs] = useState([

            { field: 'brand', sortable: true, filter: true },
            { field: 'model', sortable: true, filter: true },
            { field: 'color', sortable: true, filter: true },
            { field: 'fuel', sortable: true, filter: true },
            { field: 'modelYear', sortable: true, filter: true },
            { field: 'price', sortable: true, filter: true },
            { cellRenderer: (params) => <Editcar updateCar={updateCar} params={params} />, },
            {
                cellRenderer: (params) =>
                    <Button size="small" color="error" onClick={() => deleteCar(params)}>Delete</Button>
                , width: 120
            }

        ]);


        return (
            <>
                <Addcar saveCar={saveCar} />
                <div className="ag-theme-material" style={{ width: 1280, height: 1000 }}>
                    <AgGridReact
                        rowData={cars}
                        columnDefs={columnDefs}
                        pagination={true}
                        paginationPageSize={10}
                    />
                </div>
                <Snackbar
                    open={OpenSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                    message={MsgSnackbar}
                />
            </>
        );
    }