import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import AllArticles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";
import AllUsers from "./components/AllUsers";
import LogInPage from "./components/LogInPage";
import UserContext from "./contexts/UserContext";
import SingleUser from "./components/SingleUser";
import ArticleByTopic from "./components/ArticleByTopic";
import { getAllArticles } from "./utils/articlesApi";

function App() {
	const [username, setUsername] = useState("");
	const [articles, setArticles] = useState([]);
	const [order, setOrder] = useState("ASC");
	const [sortBy, setSortBy] = useState("topic");
	useEffect(() => {
		getAllArticles({ sortBy, order }).then((articlesfromApi) => {
			return setArticles(articlesfromApi);
		});
	}, [order, sortBy]);
	return (
		<div className="App">
			<UserContext.Provider value={{ username, setUsername }}>
				<Header />
				<NavBar />
				<Routes>
					<Route
						path="/"
						element={
							<AllArticles
								articles={articles}
								setArticles={setArticles}
								setOrder={setOrder}
								setSortBy={setSortBy}
							/>
						}
					/>
					<Route path="/articles/:article_id" element={<SingleArticle />} />
					<Route path="/users/allusers" element={<AllUsers />} />
					<Route path="/users/login" element={<LogInPage />} />
					<Route
						path={`/users/:user`}
						element={<SingleUser articles={articles} />}
					/>
					<Route path="/articles/:topic/all" element={<ArticleByTopic />} />
				</Routes>
			</UserContext.Provider>
		</div>
	);
}

export default App;
