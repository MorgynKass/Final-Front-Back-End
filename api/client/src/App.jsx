/* eslint-disable no-unused-vars */
//REACT ROUTER
import { Routes, Route } from "react-router-dom";

//REACT QUERY
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./constants/config";

import Auth from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import AuthGuard from "./components/AuthGaurd";

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthGuard>
          <Routes>
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<Tasks />}></Route>
          </Routes>
        </AuthGuard>
      </QueryClientProvider>
    </div>
  );
}

export default App;
