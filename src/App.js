import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import AllArticles from "./components/AllArticles";
import ErrorPage from "./components/ErrorPage";
import SingleArticle from "./components/SingleArticle";
import AllUsers from "./components/AllUsers";
import LogInPage from "./components/LogInPage";
import UserContext from "./contexts/UserContext";
import SingleUser from "./components/SingleUser";
import { getAllArticles } from "./utils/articlesApi";

function App() {
	const [username, setUsername] = useState("");
	const [articles, setArticles] = useState([]);
	useEffect(() => {
		getAllArticles().then((articlesfromApi) => {
			setArticles(articlesfromApi);
		});
	}, []);
	return (
		<div className="App">
			<UserContext.Provider value={{ username, setUsername }}>
				<Header />
				<NavBar />
				<Routes>
					<Route
						path="/"
						element={
							<AllArticles articles={articles} setArticles={setArticles} />
						}
					/>
					<Route path="/errorpage" element={<ErrorPage />} />
					<Route path="/articles/:article_id" element={<SingleArticle />} />
					<Route path="/users/allusers" element={<AllUsers />} />
					<Route path="/users/login" element={<LogInPage />} />
					<Route
						path={`/users/:user`}
						element={<SingleUser articles={articles} />}
					/>
				</Routes>
			</UserContext.Provider>
		</div>
	);
}

export default App;
