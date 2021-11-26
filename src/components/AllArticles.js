import React from "react";
import { Link } from "react-router-dom";
import FilterButtons from "./FilterButtons";

const AllArticles = ({ articles, setCurrentTopic, setOrder, setSortBy }) => {
	return (
		<main>
			<section className="allArticles">
				<FilterButtons
					setCurrentTopic={setCurrentTopic}
					setOrder={setOrder}
					setSortBy={setSortBy}
				/>
				{articles.map((article) => {
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
			</section>
		</main>
	);
};

export default AllArticles;
