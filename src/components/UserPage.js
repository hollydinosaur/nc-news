import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import UserContext from "../contexts/UserContext";

const UserPage = () => {
	const navigate = useNavigate();
	const { username, setUsername } = useContext(UserContext);

	return (
		<main>
			<section className="userPage">
				<p>
					{username === "" ? navigate("/users/login") : `Welcome ${username}!`}
				</p>
			</section>
		</main>
	);
};

export default UserPage;
