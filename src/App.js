import React from 'react';
import Form from './Components/Form';
import Profiles from './Components/Profiles';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/profiles' element={<Profiles />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
