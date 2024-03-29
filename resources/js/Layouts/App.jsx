import { BrowserRouter, Routes, Link } from "react-router-dom";
import CompaniesIndex from "../Pages/Companies/Index";
import CompaniesCreate from "../Pages/Companies/Create";
import CompaniesEdit from "../Pages/Companies/Edit";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<CompaniesIndex />} />
                <Route path="/companies/create" element={<CompaniesCreate />} />
                <Route path="/companies/edit/:id" element={<CompaniesEdit />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
