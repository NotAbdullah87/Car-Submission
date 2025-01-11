import LoginPage from "./pages/loginPage/LoginPage";
import "./index.css";
import { useNavigate } from "react-router-dom"; // Make sure to use react-router-dom v6 or higher
import { useEffect } from "react";

export default function App() {
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    navigate('/login'); // Redirect to the login page
  }, [navigate]); // Adding navigate to the dependency array

  return (
    <>
      {/* You can render different components based on the app's state, for now, we are redirecting to the login */}
    </>
  );
}
