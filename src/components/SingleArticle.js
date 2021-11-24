import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { getSingleArticle, getComments } from "../utils/articlesApi";
import { AddCommentGenerator, ArticleCommentGenerator } from "./Comments";
import { upVoteArticle, downVoteArticle } from "../utils/articlesApi";
import UserContext from "../contexts/UserContext";
const SingleArticle = () => {
	const { article_id } = useParams();
	const { username } = useContext(UserContext);
	const [article, setArticle] = useState({});
	const [comments, setComments] = useState([]);
	useEffect(() => {
		getSingleArticle(article_id).then((articleFromApi) => {
			setArticle(articleFromApi);
		});
	}, [article_id, article]);

	useEffect(() => {
		getComments(article_id).then((commentsFromApi) => {
			setComments(commentsFromApi);
		});
	}, [article_id, comments]);

	return (
		<main>
			<section className="singleArticle">
				<h2>{article.title}</h2>
				<h3>
					By: {article.author} At: {article.created_at}
				</h3>
				<h3>Votes: {article.votes}</h3>
				<p key={`${article.article_id}Body`}>{article.body}</p>
				<button
					key={`${article.article_id}UpVote`}
					onClick={() => {
						upVoteArticle(article_id).then(() => {
							setArticle(article);
						});
					}}
				>
					Upvote!
				</button>
				<button
					key={`${article.article_id}DownVote`}
					onClick={() => {
						downVoteArticle(article_id).then(() => {
							setArticle(article);
						});
					}}
				>
					Downvote!
				</button>
			</section>{" "}
			<AddCommentGenerator
				article_id={article_id}
				setComments={setComments}
				comments={comments}
			/>
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
