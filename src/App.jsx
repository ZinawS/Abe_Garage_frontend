import React from "react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import AppRouter from "./config/AppRouter"; // Correct import
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppRouter />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
