import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllArticles = ({ articles }) => {
	return (
		<main>
			<section className="allArticles">
				{articles.map((article) => {
					return (
						<ul>
							<li key={`${article.title}Title`}>{article.title}</li>
							<Link to={`/articles/${article.article_id}`}>
								<li key="{article.title} link">Click to view</li>
							</Link>
							<li key="{article.author} key">
								{`By: `}
								<Link to={`/users/${article.author}`}>{article.author}</Link>
							</li>
							<li key={article.topic}>Topic: {article.topic}</li>
							<li key={article.votes}>Votes: {article.votes}</li>
						</ul>
					);
				})}
			</section>
		</main>
	);
};

export default AllArticles;
