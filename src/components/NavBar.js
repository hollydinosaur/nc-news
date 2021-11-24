import React from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
const NavBar = () => {
	const { username } = useContext(UserContext);
	let link = "/users/login";
	let text = "Log In";
	if (username !== "") {
		link = `/users/${username}`;
		text = "My Page";
	}
	return (
		<main>
			<section className="NavBar">
				<Link to="/">
					<span>Home</span>
				</Link>
				<Link to="/users">
					<span>View All Users</span>
				</Link>
				<Link to={link}>
					<span>{text}</span>
				</Link>
			</section>
		</main>
	);
};

export default NavBar;
