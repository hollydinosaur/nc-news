import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { getAllTopics } from "../utils/topicsApi";

const NavBar = () => {
	const [topics, setTopics] = useState([]);
	useEffect(() => {
		getAllTopics().then((topicsFromApi) => {
			setTopics(topicsFromApi);
		});
	}, [topics]);
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
					<span className="navButton"> All Articles</span>
				</Link>
				{`   |   `}
				<Link to="/users/allusers">
					<span className="navButton"> View All Users</span>
				</Link>
				{`   |   `}
				<Link to={link}>
					<span className="navButton"> {text}</span>
				</Link>
				<p>
					View Articles about: {`      `}
					{topics.map((topic) => {
						return (
							<Link
								to={`/articles/${topic.slug}/all`}
								key={`${topic.slug}Link`}
							>
								{topic.slug}
								{`   |   `}
							</Link>
						);
					})}
				</p>
			</section>
		</main>
	);
};

export default NavBar;
