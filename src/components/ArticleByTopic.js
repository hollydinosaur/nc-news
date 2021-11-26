import React, { useEffect, useState } from "react";
import { getArticlesByTopic } from "../utils/articlesApi";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const ArticleByTopic = () => {
	const { topic } = useParams();
	const [topicArticles, setTopicArticles] = useState([]);
	useEffect(() => {
		getArticlesByTopic({ sortBy: "ASC", order: "created_at", topic }).then(
			(articlesfromApi) => {
				setTopicArticles(articlesfromApi);
			}
		);
	}, [topic]);
	return (
		<main>
			<h2>Articles about {topic}</h2>
			{topicArticles.map((article) => {
				return (
					<ul>
						<li className="Titles" key={`${article.title}Title`}>
							{article.title}
						</li>
						<Link to={`/articles/${article.article_id}`}>
							<li key={`${article.title} link`}>Click to view</li>
						</Link>
						<li key={`${article.author} key`}>
							{`By: `}
							<Link to={`/users/${article.author}`}>{article.author}</Link>
						</li>
						<li key={article.topic}>Topic: {article.topic}</li>
						<li key={article.votes}>Votes: {article.votes}</li>
					</ul>
				);
			})}
		</main>
	);
};

export default ArticleByTopic;
