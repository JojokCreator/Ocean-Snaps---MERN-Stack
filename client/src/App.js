import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home/Home.js';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import PostDetails from './components/PostDetails/PostDetails.jsx';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  }
});


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <ThemeProvider theme={theme}>
    <GoogleOAuthProvider clientId="58583375783-7l0rf8rm3q8osscu0bnmcc0912eaa8en.apps.googleusercontent.com">
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts"/>} />
          <Route path="/posts" exact element={<Home/>}/>
          <Route path="/posts/search" exact element={<Home/>}/>
          <Route path="/posts/:id" exact element={<PostDetails/>}/>
          <Route path="/auth" exact element={(!user) ? <Auth /> : <Navigate to="/posts"/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
    </ThemeProvider>
  )
}

export default App
