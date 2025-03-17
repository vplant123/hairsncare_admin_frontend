// import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
    const navigate = useNavigate();
    //   const error = useRouteError();
  return (
    <div class="error-container"> 
        <h1> 404 </h1> 
        <p> 
            Oops! The page you're 
            looking for is not here. 
        </p> 
        <a onClick={() => navigate("/home")}> 
            Go Back to Home 
        </a> 
    </div> 
  );
}

export default ErrorPage;