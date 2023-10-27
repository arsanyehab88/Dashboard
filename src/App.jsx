import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material"
import { themeSettings } from "./theme.js"
import { useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { BrowserRouter, Navigate, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom"
import MainLayout from "./components/MainLayout/MainLayout.jsx"
import DashBoard from "./components/DashBoard/DashBoard.jsx"
import Product from "./components/Product/Product.jsx";
import Customers from "./components/Customers/Customers.jsx"
import Transactions from "./components/Transactions/Transactions.jsx"
import Geography from "./components/Geography/Geography.jsx"
import OverView from "./components/OverView/OverView.jsx"
import Daily from "./components/Daily/Daily.jsx"
import Monthly from "./components/Monthly/Monthly.jsx"
import BreakDown from "./components/BreakDown/BreakDown.jsx"
import Admin from "./components/Admin/Admin.jsx"
import Performance from "./components/Performance/Performance.jsx"
import Signup from "./components/Signup/Signup.jsx"
import Signin from "./components/Signin/Signin.jsx"
import { useState } from "react"
import Setting from "./components/Setting/Setting.jsx"

function App() {
  const mode = useSelector((state) => state?.user?.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  const userId = useSelector((state) => state?.user?.user?._id)




  function ProtuctRouters(props) {
    if (userId !== undefined) {
      return props.children
    } else {
      return <Navigate to="/signin" />
    }
  }



  return (

    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard/" replace />} />
              <Route path="/dashboard/" element={<ProtuctRouters><DashBoard /></ProtuctRouters>} />
              <Route path="/products" element={<ProtuctRouters><Product /></ProtuctRouters>} />
              <Route path="/customers" element={<ProtuctRouters><Customers /></ProtuctRouters>} />
              <Route path="/Transactions" element={<ProtuctRouters><Transactions /></ProtuctRouters>} />
              <Route path="/Geography" element={<ProtuctRouters><Geography /></ProtuctRouters>} />
              <Route path="/OverView" element={<ProtuctRouters><OverView /></ProtuctRouters>} />
              <Route path="/Daily" element={<ProtuctRouters><Daily /> </ProtuctRouters>} />
              <Route path="/monthly" element={<ProtuctRouters><Monthly /></ProtuctRouters>} />
              <Route path="/breakdown" element={<ProtuctRouters><BreakDown /></ProtuctRouters>} />
              <Route path="/admin" element={<ProtuctRouters><Admin /></ProtuctRouters>} />
              <Route path="/performance" element={<ProtuctRouters><Performance /></ProtuctRouters>} />
              <Route path="/setting" element={<ProtuctRouters><Setting /></ProtuctRouters>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>



    </div>

  )
}

export default App
