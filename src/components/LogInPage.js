import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../contexts/UserContext";
import { getUserByUsername } from "../utils/usersApi";

const LogInPage = () => {
	const { username, setUsername } = useContext(UserContext);
	const [isUser, setIsUser] = useState(true);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	if (isLoading === true) return <p>Loading...</p>;
	return (
		<main>
			<section className="logIn">
				<h2>Please log in!</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						setIsLoading(true);
						getUserByUsername(username).then((res) => {
							if (res === undefined) {
								setUsername("");
								setIsUser(false);
								setIsLoading(false);
							} else {
								setUsername(username);
								setIsUser(true);
								setIsLoading(false);
								navigate(`/users/${username}`);
							}
						});
					}}
				>
					<label htmlFor="inputUsername">Type Your Username</label>
					<input
						type="text"
						onBlur={(e) => {
							setUsername(e.target.value);
						}}
					/>
					<input type="submit" value="Submit" />
				</form>
				<p>{isUser === false ? "Please enter a valid log in" : ""}</p>
			</section>
		</main>
	);
};

export default LogInPage;
