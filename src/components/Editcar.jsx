import React from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';

export default function Editcar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', modelYear: '', price: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
        setCar({ brand: props.car.brand, model: props.car.model, color: props.car.color, fuel: props.car.fuel, year: props.car.modelYear, price: props.car.price })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value })
    }
    

    const updateCar = () => {
        props.updateCar(car, props.params.data._links.car.href);
        handleClose();
    }
    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={e => handleInputChange(e)}
                        label="Brand"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={e => handleInputChange(e)}
                        label="Model"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={e => handleInputChange(e)}
                        label="Color"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        onChange={e => handleInputChange(e)}
                        label="Fuel"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="modelYear"
                        value={car.modelYear}
                        onChange={e => handleInputChange(e)}
                        label="modelYear"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="price"
                        value={car.price}
                        onChange={e => handleInputChange(e)}
                        label="Price"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateCar}>Edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}