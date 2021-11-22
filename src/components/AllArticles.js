import React, { useEffect, useState } from "react";
import { getAllArticles } from "../utils/articlesApi";
const AllArticles = () => {
	const [articles, setArticles] = useState([]);
	useEffect(() => {
		getAllArticles().then((articlesfromApi) => {
			setArticles(articlesfromApi);
		});
	}, []);
	return (
		<main>
			<section className="allArticles"></section>
		</main>
	);
};

export default AllArticles;
