import React from "react";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import { useContext } from "react";
const NavBar = () => {
	return (
		<main>
			<section className="NavBar">
				<Link to="/">
					<span>Home</span>
				</Link>
				<Link to="/users">
					<span>View All Users</span>
				</Link>
				<Link to="/users/:username">
					<span>My Page</span>
				</Link>
			</section>
		</main>
	);
};

export default NavBar;
