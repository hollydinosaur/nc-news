import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
	getSingleArticle,
	getComments,
	upVoteArticle,
	downVoteArticle,
} from "../utils/articlesApi";
import { upVoteComment, downVoteComment } from "../utils/commentsApi";

const SingleArticle = () => {
	const { article_id } = useParams();
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
				<h2>All Comments</h2>
				{comments.map((comment) => {
					return (
						<ul>
							<li key={`${comment.comment_id}details`}>
								{comment.author} says: {comment.body}
							</li>
							<li key={`${comment.comment_id}votes`}>Votes: {comment.votes}</li>
							<button
								key={`${comment.comment_id}UpVoteButton`}
								onClick={() => {
									upVoteComment(comment.comment_id).then(() => {
										setComments(comments);
									});
								}}
							>
								Upvote!
							</button>
							<button
								key={`${comment.comment_id}DownVoteButton`}
								onClick={() => {
									downVoteComment(comment.comment_id).then(() => {
										setComments(comments);
									});
								}}
							>
								Downvote!
							</button>
						</ul>
					);
				})}
			</section>
		</main>
	);
};

export default SingleArticle;
