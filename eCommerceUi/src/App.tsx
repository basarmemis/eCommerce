import './App.css';
import Catalog from './components/catalog/Catalog';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Navbar from './components/navbar/Navbar';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetails from './components/catalog/ProductDetails';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/contact/ContactPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from './components/errors/ServerError';
import NotFound from './components/errors/NotFound';
import agent from './api/agent';
import { getCookie } from './helpers/helpers';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';
import CheckoutPage from './pages/CheckoutPage';
import BasketPage from './pages/basket/BasketPage';
import { useAppDispatch } from './store/configureStore';
import { setBasket } from './pages/basket/basketSlice';



function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
    else {
      setLoading(false);
    }

  }, [dispatch])



  const [darkMode, setDarkMode] = useState(false);
  const paletteMode = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteMode,
      background: {
        default: darkMode ? '#121212' : '#eaeaea'
      }
    }
  });

  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  if (loading) return <LoadingSpinner message='Initialisation the App' />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        theme='colored'
        position='bottom-right'
      />
      <CssBaseline />
      <Navbar
        handleDarkMode={handleDarkMode}
        darkMode={darkMode}
      />
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={{ xs: 1, sm: 0, md: 0 }} columnSpacing={{ xs: 1, sm: 0, md: 0 }} columns={12}>
          <Grid item xs={12}>

          </Grid>
          <Grid item xs={12}>
            <Container>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='catalog' element={<Catalog />} />
                <Route path='catalog/:id' element={<ProductDetails />} />
                <Route path='about' element={<AboutPage />} />
                <Route path='contact' element={<ContactPage />} />
                <Route path='server-error' element={<ServerError />} />
                <Route path='basket' element={<BasketPage />}></Route>
                <Route path='checkout' element={<CheckoutPage />}></Route>
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>

  );
}

export default App;
