import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
	deleteComment,
	upVoteComment,
	downVoteComment,
} from "../utils/commentsApi";
import { addComment } from "../utils/articlesApi";
import UserContext from "../contexts/UserContext";
import { upVoteArticle, downVoteArticle } from "../utils/articlesApi";
import { useNavigate } from "react-router";

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
									<li key={`${comment.comment_id}Article`}>
										{`On article: `}
										<Link
											to={`/articles/${article.article_id}`}
											key={article.article_id}
										>
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
						<ul key={`${comment.comment_id}Details`}>
							<li key={`${comment.comment_id}body`}>
								{comment.author} says: {comment.body}
							</li>
							<li key={`${comment.comment_id}votes`}>
								Votes: {comment.votes === null ? "0" : comment.votes}
							</li>
							<li key={`${comment.comment_id}Interaction`}>
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
							</li>
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
	const [clicked, setClicked] = useState(false);
	const [err, setErr] = useState("");
	const navigate = useNavigate();
	return (
		<div>
			<button
				key={`${comment_id}UpVoteButton`}
				onClick={() => {
					if (clicked === false) {
						upVoteComment(comment_id)
							.then(() => {
								setClicked(true);
								setComments(comments);
							})
							.catch((err) => {
								navigate("/errorpage");
							});
					} else {
						setErr("You can only vote once!");
					}
				}}
			>
				Upvote!
			</button>
			<button
				key={`${comment_id}DownVoteButton`}
				onClick={() => {
					if (clicked === false) {
						downVoteComment(comment_id)
							.then(() => {
								setClicked(true);
								setComments(comments);
							})
							.catch((err) => {
								navigate("/errorpage");
							});
					} else {
						setErr("You can only vote once!");
					}
				}}
			>
				Downvote!
			</button>
			<p>{err}</p>
		</div>
	);
};
export const DeleteComment = ({ id, setUserComments, userComments }) => {
	const navigate = useNavigate();
	return (
		<div>
			<button
				key={`${id}Delete`}
				onClick={() => {
					deleteComment(id)
						.then(() => {
							setUserComments(userComments);
						})
						.catch((err) => {
							navigate("/errorpage");
						});
				}}
			>
				Delete this comment
			</button>
		</div>
	);
};

export const ArticleUpDownVoteGenerator = ({
	article_id,
	setVotes,
	setArticle,
	article,
}) => {
	const [clicked, setClicked] = useState(false);
	const [err, setErr] = useState("");
	const navigate = useNavigate();
	return (
		<div>
			<button
				key={`${article.article_id}UpVote`}
				onClick={() => {
					upVoteArticle(article_id)
						.then(() => {
							if (clicked === false) {
								setClicked(true);
								setVotes((prevVotes) => prevVotes + 1);
								setArticle(article);
							} else {
								setErr("You can only vote once!");
							}
						})
						.catch((err) => {
							navigate("/errorpage");
						});
				}}
			>
				Upvote!
			</button>
			<button
				key={`${article.article_id}DownVote`}
				onClick={() => {
					if (clicked === false) {
						downVoteArticle(article_id)
							.then(() => {
								setClicked(true);
								setVotes((prevVotes) => prevVotes - 1);
								setArticle(article);
							})
							.catch((err) => {
								navigate("/errorpage");
							});
					} else {
						setErr("You can only vote once!");
					}
				}}
			>
				Downvote!
			</button>
			<p>{err}</p>
		</div>
	);
};
