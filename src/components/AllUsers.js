import React, { useEffect, useState } from "react";
import { getAllUsers } from "../utils/usersApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const AllUsers = () => {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		getAllUsers()
			.then((usersFromApi) => {
				setUsers(usersFromApi);
			})
			.catch((err) => {
				navigate("/errorpage");
			});
	}, [navigate]);

	return (
		<main>
			<h2>All Users</h2>
			<div className="allUsers">
				{users.map((user) => {
					return (
						<ul key={`${user.username}Details`}>
							<Link to={`/users/${user.username}`}>
								<li key={`${user.username}`}>
									<h3>{user.username}</h3>
								</li>
							</Link>
							<li key={`${user.username}Name`}>Name: {user.name}</li>
							<img
								src={user.avatar_url}
								alt={user.username}
								key={`${user.username}Img`}
							/>{" "}
						</ul>
					);
				})}
			</div>
		</main>
	);
};

export default AllUsers;
