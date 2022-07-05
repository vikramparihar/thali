import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import "@fontsource/roboto";
import './App.css';
import Login from './components/login';
import Register from './components/register';
import Layout from './components/layout';
import Dashboard from './components/dashboard';
import Order from './components/order';
import Invoice from './components/invoice';
import Setting from './components/setting';
import Recipe from './components/recipe';


export default function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="order" element={<Order />}/>
          <Route path="invoice" element={<Invoice />}/>
          <Route path="recipe" element={<Recipe />}/>
          <Route path="setting" element={<Setting />}/>
        
        </Route>
      </Routes>
    </Router>
  );
}
