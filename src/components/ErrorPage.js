import { Link } from "react-router-dom";
import React from "react";
const ErrorPage = () => {
	return (
		<main>
			<h2>Oh no! Sorry Something went wrong :(</h2>
			<Link to="/">Home</Link>
		</main>
	);
};

export default ErrorPage;
