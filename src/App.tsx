import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header/Header"
import AppRoutes from "./routes/AppRoutes"


function App() {

  return (
    <BrowserRouter>
      <Header /> {/* Always visible */}
      <main>
        <AppRoutes /> {/* Page content changes with route */}
      </main>
      <footer>© 2025 Data structure</footer>
    </BrowserRouter>
  )
}

export default App
