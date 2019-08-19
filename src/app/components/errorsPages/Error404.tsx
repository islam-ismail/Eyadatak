import React, { SFC } from "react";
import error404 from "../../assets/images/error-404.svg";
import { Link } from "react-router-dom";

const Error404: SFC = props => {
    return (
        <div className="error-page">
            <figure>
                <img src={error404} alt="404 Illustration" />
            </figure>
            <h2>Page Not Found!</h2>
            <p>
                The page you're looking for doesn't exist, <Link to="/dashboard">Go Back</Link> to
                the home screen.
            </p>
        </div>
    );
};

export default Error404;
