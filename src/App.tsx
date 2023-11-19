import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage.tsx';
import { Week } from './pages/Week/Week.tsx';
import { NotFound } from './pages/NotFound/NotFound.tsx';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" index element={<HomePage />} />
                <Route path="/week" element={<Week />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
