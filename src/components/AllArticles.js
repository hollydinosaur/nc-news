import React from "react";
import { Link } from "react-router-dom";
import FilterButtons from "./FilterButtons";

const AllArticles = ({ articles, setOrder, setSortBy }) => {
	return (
		<main>
			<section className="filterButtons">
				<FilterButtons setOrder={setOrder} setSortBy={setSortBy} />
			</section>
			<section className="allArticles">
				{articles.map((article) => {
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
			</section>
		</main>
	);
};

export default AllArticles;
