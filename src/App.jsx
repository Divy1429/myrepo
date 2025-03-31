import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import './app.css';
import Dashboard from './Dashboard';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Typography, Box } from '@mui/material';





const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4cc9f0',
    },
    secondary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e6f7ff',
      secondary: '#a0a0a0',
    },
  },
  typography: {
    fontFamily: 'inherit',
    h4: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ minHeight: '100vh', py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <WbSunnyIcon sx={{ fontSize: '3rem', color: '#ffd700', mb: 1 }} />
          <Typography variant="h4" sx={{
            background: 'linear-gradient(45deg, #4cc9f0 30%, #90caf9 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Weather Dashboard
          </Typography>
        </Box>
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
}

export default App;