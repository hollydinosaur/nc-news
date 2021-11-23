import React, { useEffect, useState } from "react";
import { getAllArticles } from "../utils/articlesApi";
import { Link } from "react-router-dom";
const AllArticles = () => {
	const [articles, setArticles] = useState([]);
	useEffect(() => {
		getAllArticles().then((articlesfromApi) => {
			setArticles(articlesfromApi);
		});
	}, []);
	return (
		<main>
			<section className="allArticles">
				{articles.map((article) => {
					return (
						<ul>
							{" "}
							<Link to={`/articles/${article.article_id}`}>
								<li key="{article.title} link">{article.title}</li>
							</Link>
							<Link to={`/articles/${article.author}`}>
								<li key="{article.author} key">{article.author}</li>
							</Link>
							<li key={article.topic}>{article.topic}</li>
							<li key={article.votes}>Votes: {article.votes}</li>
						</ul>
					);
				})}
			</section>
		</main>
	);
};

export default AllArticles;
