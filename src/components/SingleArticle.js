import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { getSingleArticle, getComments } from "../utils/articlesApi";
import { AddCommentGenerator, ArticleCommentGenerator } from "./Comments";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ArticleUpDownVoteGenerator } from "./Comments";

const SingleArticle = () => {
	const { article_id } = useParams();
	const [article, setArticle] = useState({});
	const [comments, setComments] = useState([]);
	const [votes, setVotes] = useState("");
	const { username } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		getSingleArticle(article_id)
			.then((articleFromApi) => {
				setArticle(articleFromApi);
				setVotes(articleFromApi.votes);
			})
			.catch((err) => {
				navigate("/errorpage");
			});
	}, [article_id, votes, navigate]);

	useEffect(() => {
		getComments(article_id)
			.then((commentsFromApi) => {
				setComments(commentsFromApi);
			})
			.catch((err) => {
				navigate("/errorpage");
			});
	}, [article_id, comments, navigate]);

	return (
		<main>
			<section className="singleArticle">
				<h2>{article.title}</h2>
				<h3>
					By:{" "}
					{article.author === username ? (
						"You"
					) : (
						<Link to={`/users/${article.author}`}>{article.author}</Link>
					)}{" "}
					At: {article.created_at}
				</h3>
				<h3>Votes: {votes}</h3>
				<p key={`${article.article_id}Body`}>{article.body}</p>
				{article.author === username ? (
					""
				) : (
					<ArticleUpDownVoteGenerator
						article_id={article.article_id}
						setVotes={setVotes}
						setArticle={setArticle}
						article={article}
					/>
				)}
			</section>{" "}
			{username === "" ? (
				<Link to="/users/login">
					<p>Log in to comment on this article!</p>
				</Link>
			) : (
				<AddCommentGenerator
					article_id={article_id}
					setComments={setComments}
					comments={comments}
				/>
			)}
			<ArticleCommentGenerator
				article={article}
				setArticle={setArticle}
				comments={comments}
				setComments={setComments}
				article_id={article_id}
			/>
		</main>
	);
};

export default SingleArticle;
