import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import MealsListPage from './pages/MealsListPage';
import CreateMealPage from './pages/CreateMealPage';
import NotFoundPage from './pages/NotFoundPage';
import MealDetailPage from './pages/MealDetailPage';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<MealsListPage />} />
          <Route path="/products/:id" element={<MealDetailPage />} />
          <Route path="/create-product" element={<CreateMealPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
