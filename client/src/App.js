import React from "react";
import { Container } from '@material-ui/core'
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />}/>
          <Route path="/posts" exact element={<Home/>} />
          <Route path="/posts/search" exact element={<Home/>} />
          <Route path="/posts/:id" exact element={<PostDetails/>} />
          <Route path="/auth" exact element={!user ? <Auth/> : <Navigate to='/posts' replace />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
