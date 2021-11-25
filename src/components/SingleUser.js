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
	let isUser = false;
	if (user === username) isUser = true;

	useEffect(() => {
		getUserByUsername(user).then((userFromApi) => {
			setUserpage(userFromApi);
		});
	}, [user]);
	useEffect(() => {
		getCommentsByUser(user).then((commentsFromApi) => {
			setUserComments(commentsFromApi);
		});
	}, [user, userComments]);

	if (userpage === undefined) return <p>This user does not exist!</p>;
	return (
		<main>
			<section className="singleUserPage">
				<h2>{`${userpage.username}`}</h2>
				<img src={userpage.avatar_url} alt={userpage.username} />
				<p>Name: {userpage.name}</p>
				{isUser ? (
					<h2>Your Comments</h2>
				) : (
					<h2>{`${userpage.username}'s comments`} </h2>
				)}
				<UserCommentGenerator
					articles={articles}
					userComments={userComments}
					setUserComments={setUserComments}
					isUser={isUser}
					user={user}
				/>
			</section>
		</main>
	);
};

export default SingleUser;
