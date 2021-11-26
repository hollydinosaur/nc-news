import React, { useEffect, useState } from "react";
import { getAllUsers } from "../utils/usersApi";
import { Link } from "react-router-dom";

const AllUsers = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllUsers().then((usersFromApi) => {
			setUsers(usersFromApi);
		});
	}, [users]);

	return (
		<main>
			<section className="allUsers">
				<h2>All Users</h2>
				{users.map((user) => {
					return (
						<ul>
							<Link to={`/users/${user.username}`}>
								<li key={`${user.username}`}>
									<h3>{user.username}</h3>
								</li>
							</Link>
							<li key={`${user.username}Name`}>Name: {user.name}</li>
							<div className="imgDiv">
								<img
									src={user.avatar_url}
									alt={user.username}
									key={`${user.username}Img`}
								/>{" "}
							</div>
						</ul>
					);
				})}
			</section>
		</main>
	);
};

export default AllUsers;
