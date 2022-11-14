/** @format */

import { useState } from 'react';
import {
  Box,
  FormGroup,
  MenuItem,
  TextField,
  Button,
  Container,
  FormControl,
  Grid,
  FormHelperText,
  Snackbar,
  Alert,
  Autocomplete,
} from '@mui/material';
import axios from 'axios';

const takken = ['kapoen', 'wouter', 'jonggiver', 'giver', 'jin'];

export default function AddPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tak, setTak] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(true);

  const resetValue = () => {
    setFirstName('');
    setLastName('');
    setError(false);
    setHelperText('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (firstName.length < 3 || lastName.length < 3 || tak.length === 0) {
      setError(true);
      setHelperText('Please fill in all fields');
      setOpen(false);
      setFocus(true);
    } else {
      axios
        .post('http://localhost:9000/api/leden/', {
          firstname: firstName,
          lastname: lastName,
          tak: tak,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      resetValue();
      setOpen(true);
      setFocus(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ marginTop: '2rem' }}>
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ padding: '1rem' }} fullWidth variant="outlined">
              <TextField
                color="success"
                helperText="Bv. Jan"
                label="Firstname"
                margin="normal"
                onChange={(e) => setFirstName(e.target.value)}
                required
                variant="outlined"
                value={firstName}
                autoFocus={focus}
              />
              <TextField
                color="success"
                helperText="Bv. Jansens"
                label="Lastname"
                margin="normal"
                onChange={(e) => setLastName(e.target.value)}
                required
                variant="outlined"
                value={lastName}
              />
              {/* <TextField
                select
                color="success"
                label="Tak"
                margin="normal"
                onChange={(e) => setTak(e.target.value)}
                required
                variant="outlined"
                value={tak}
                defaultChecked="kapoenen"
              >
                {takken.map((tak) => (
                  <MenuItem key={tak} value={tak} color="success">
                    {tak}
                  </MenuItem>
                ))}
              </TextField> */}
              <Autocomplete
                required
                defaultValue="kapoen"
                id="tak"
                disablePortal
                onInputChange={(e, value) => {
                  setTak(value);
                }}
                options={takken}
                renderInput={(params) => <TextField {...params} label="tak" />}
              />
              <FormHelperText error={error} sx={{ fontSize: '1rem' }}>
                {helperText}
              </FormHelperText>
              <Grid
                container
                directoin="row"
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                paddingTop={2}
              >
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={resetValue}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    type="submit"
                  >
                    Voeg toe
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Container>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        severity="success"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Lid is succesvol toegvoegd
        </Alert>
      </Snackbar>
    </>
  );
}
