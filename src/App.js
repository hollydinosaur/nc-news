import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import AllArticles from "./components/AllArticles";
import ErrorPage from "./components/ErrorPage";
import SingleArticle from "./components/SingleArticle";

function App() {
	const [username, setUsername] = useState("");
	return (
		<div className="App">
			<Header />
			<NavBar username={username} />
			<Routes>
				<Route path="/" element={<AllArticles />} />
				<Route path="/errorpage" element={<ErrorPage />} />
				<Route path="/articles/:article_id" element={<SingleArticle />} />
			</Routes>
		</div>
	);
}

export default App;
