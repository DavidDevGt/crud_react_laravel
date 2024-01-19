import { BrowserRouter, Routes, Link } from "react-router-dom";
import CompaniesIndex from "../Pages/Companies/Index";
import CompaniesCreate from "../Pages/Companies/Create";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element="{<CompaniesIndex />}" />
                <Route path="/companies/create" element="{<CompaniesCreate />}" />
            </Routes>
        </BrowserRouter>
    )
}
export default App;