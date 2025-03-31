import { useState } from "react";
import { 
  TextField, 
  Button, 
  Box,
  InputAdornment,
  Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export default function SearchBox({ updateInfo, setFilter }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!city.trim()) {
            setError(true);
            setErrorMessage("Please enter a city name");
            return;
        }

        try {
            const API_KEY = "03c0cb8317a21679c25691cf297f04a7";
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            
            if (data.cod !== 200) throw new Error(data.message);
            updateInfo(data.name);
            setError(false);
        } catch (err) {
            setError(true);
            setErrorMessage(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
               
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
                Real-time weather insights & analytics
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        setError(false);
                    }}
                    error={error}
                    helperText={error && errorMessage}
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            fontSize: '1rem',
                            '&.Mui-focused fieldset': {
                                borderWidth: 2,
                                borderColor: 'primary.main'
                            }
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'action.active' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                        mb: 2,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                    }}
                >
                    GET WEATHER
                </Button>

                <Button
                    fullWidth
                    variant="text"
                    size="medium"
                    startIcon={<MyLocationIcon />}
                    onClick={() => setFilter('local')}
                    sx={{
                        color: 'primary.main',
                        textTransform: 'none',
                        fontWeight: 500,
                    }}
                >
                    My Location
                </Button>
            </form>
        </Box>
    );
}