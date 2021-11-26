import React, { useEffect, useState } from "react";
import { getArticlesByTopic } from "../utils/articlesApi";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import { useNavigate } from "react-router";
const ArticleByTopic = () => {
	const { topic } = useParams();
	const [sortBy, setSortBy] = useState("created_at");
	const [order, setOrder] = useState("ASC");
	const [topicArticles, setTopicArticles] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		getArticlesByTopic({ sortBy, order, topic })
			.then((articlesfromApi) => {
				if (articlesfromApi[0].title === undefined) navigate("/errorpage");
				setTopicArticles(articlesfromApi);
			})
			.catch((err) => {
				navigate("/errorpage");
			});
	}, [topic, sortBy, order, navigate]);

	return (
		<main>
			<h2>Articles about {topic}</h2>
			<FilterButtons setOrder={setOrder} setSortBy={setSortBy} />
			{topicArticles.map((article) => {
				return (
					<ul key={`${article.article_id}Details`}>
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
