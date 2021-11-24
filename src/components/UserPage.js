import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserContext from "../contexts/UserContext";
import { getUserByUsername } from "../utils/usersApi";

const UserPage = () => {
	const navigate = useNavigate();
	const { username, setUsername } = useContext(UserContext);
	const [userDetails, setUserDetails] = useState([]);
	useEffect(() => {
		getUserByUsername(username).then((userFromApi) => {
			setUserDetails(userFromApi);
		});
	}, []);

	return (
		<main>
			<section className="userPage">
				<p>Hello {username}!</p>
				<img src={userDetails.avatar_url} alt={username} />
			</section>
		</main>
	);
};

export default UserPage;
