import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
	deleteComment,
	upVoteComment,
	downVoteComment,
} from "../utils/commentsApi";
import { addComment } from "../utils/articlesApi";
import UserContext from "../contexts/UserContext";

export const UserCommentGenerator = ({
	articles,
	userComments,
	setUserComments,
}) => {
	return (
		<section className="singleUserComments">
			<h2>Your Comments</h2>
			{userComments.map((comment) => {
				return (
					<span>
						{articles.map((article) => {
							if (article.article_id === comment.article_id) {
								return (
									<ul>
										<li key={comment.comment_id}>You said: {comment.body}</li>
										<li key={article.article_id}>
											{`On article: `}
											<Link to={`/articles/${article.article_id}`}>
												{article.title}
											</Link>
										</li>
										<li>
											<button
												key={`${comment.comment_id}Delete`}
												onClick={() => {
													deleteComment(comment.comment_id).then(() => {
														setUserComments(userComments);
													});
												}}
											>
												Delete this comment
											</button>
										</li>
									</ul>
								);
							}
						})}
					</span>
				);
			})}
		</section>
	);
};

export const ArticleCommentGenerator = ({
	article,
	setArticle,
	comments,
	setComments,
	article_id,
}) => {
	return (
		<main>
			<section className="articleComment">
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

export const AddCommentGenerator = ({ article_id, setComments, comments }) => {
	const [newComment, setNewComment] = useState();
	const { username } = useContext(UserContext);
	return (
		<section className="addComment">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addComment(article_id, username, newComment).then(() => {
						setComments(comments);
					});
				}}
			>
				<label htmlFor="inputComment">Add your comment!</label>
				<p></p>
				<input
					type="text"
					id="inputComment"
					onChange={(e) => {
						setNewComment(e.target.value);
					}}
				/>
				<input type="submit" value="submit" />
			</form>
		</section>
	);
};
