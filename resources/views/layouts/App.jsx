import { BrowserRouter, Routes, Link } from "react-router-dom";
import CompaniesIndex from "../../js/Pages/Companies/Index";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element="{<CompaniesIndex />}" />
            </Routes>
        </BrowserRouter>
    )
}
export default App;