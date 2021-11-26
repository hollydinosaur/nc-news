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
	isUser,
	user,
}) => {
	return (
		<section className="singleUserComments">
			{userComments.map((comment) => {
				return (
					<span>
						{articles.map((article) => {
							return (
								<ul>
									<li key={`${comment.comment_id}Username`}>
										{isUser ? <p>You said: </p> : <p>{user} said: </p>}
										{comment.body}
									</li>
									<li key={article.article_id}>
										{`On article: `}
										<Link to={`/articles/${article.article_id}`}>
											{article.title}
										</Link>
									</li>
									<li key={`${comment.comment_id}Votes`}>
										Votes: {comment.votes}
									</li>
									<li key={`${comment.comment_id}Interaction`}>
										{isUser ? (
											<DeleteComment
												id={comment.comment_id}
												userComments={userComments}
												setUserComments={setUserComments}
											/>
										) : (
											<UpDownVoteGenerator
												comment_id={comment.comment_id}
												comments={userComments}
												setComments={setUserComments}
											/>
										)}
									</li>
								</ul>
							);
						})}
					</span>
				);
			})}
		</section>
	);
};

export const ArticleCommentGenerator = ({ comments, setComments }) => {
	const { username } = useContext(UserContext);
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
							<li key={`${comment.comment_id}votes`}>
								Votes: {comment.votes === null ? "0" : comment.votes}
							</li>
							{comment.author === username ? (
								<DeleteComment
									id={comment.comment_id}
									setUserComments={setComments}
									userComments={comments}
								/>
							) : (
								<UpDownVoteGenerator
									comment_id={comment.comment_id}
									setComments={setComments}
									comments={comments}
								/>
							)}
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
					addComment({ article_id, username, newComment }).then(() => {
						setComments(comments);
					});
				}}
			>
				<label htmlFor="inputComment">Add your comment!</label>
				<p></p>
				<input
					type="text"
					id="inputComment"
					onBlur={(e) => {
						setNewComment(e.target.value);
					}}
				/>
				<input type="submit" value="submit" />
			</form>
		</section>
	);
};

export const UpDownVoteGenerator = ({ comment_id, setComments, comments }) => {
	return (
		<div>
			<button
				key={`${comment_id}UpVoteButton`}
				onClick={() => {
					upVoteComment(comment_id).then(() => {
						setComments(comments);
					});
				}}
			>
				Upvote!
			</button>
			<button
				key={`${comment_id}DownVoteButton`}
				onClick={() => {
					downVoteComment(comment_id).then(() => {
						setComments(comments);
					});
				}}
			>
				Downvote!
			</button>
		</div>
	);
};
export const DeleteComment = ({ id, setUserComments, userComments }) => {
	return (
		<div>
			<button
				key={`${id}Delete`}
				onClick={() => {
					deleteComment(id).then(() => {
						setUserComments(userComments);
					});
				}}
			>
				Delete this comment
			</button>
		</div>
	);
};
