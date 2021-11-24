import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { getCommentsByUser, getUserByUsername } from "../utils/usersApi";
import UserContext from "../contexts/UserContext";
import { UserCommentGenerator } from "./Comments";
const SingleUser = ({ articles }) => {
	const { user } = useParams();
	const [userpage, setUserpage] = useState({});
	const [userComments, setUserComments] = useState([]);
	const { username } = useContext(UserContext);
	useEffect(() => {
		getUserByUsername(user).then((userFromApi) => {
			setUserpage(userFromApi);
		});
	}, [user]);
	useEffect(() => {
		getCommentsByUser(user).then((commentsFromApi) => {
			setUserComments(commentsFromApi);
		});
	}, [user]);
	if (userpage === undefined) return <p>This user does not exist!</p>;
	return (
		<main>
			<section className="singleUserPage">
				<h2>{`${userpage.username}`}</h2>
				<img src={userpage.avatar_url} alt={userpage.username} />
				<p>Name: {userpage.name}</p>
				<UserCommentGenerator
					articles={articles}
					userComments={userComments}
					setUserComments={setUserComments}
				/>
			</section>
		</main>
	);
};

export default SingleUser;
