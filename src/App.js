import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import AllArticles from "./components/AllArticles";
import ErrorPage from "./components/ErrorPage";
import SingleArticle from "./components/SingleArticle";
import AllUsers from "./components/AllUsers";
import LogInPage from "./components/LogInPage";
import UserPage from "./components/UserPage";
import UserContext from "./contexts/UserContext";

function App() {
	const [username, setUsername] = useState("");
	return (
		<div className="App">
			<UserContext.Provider value={{ username, setUsername }}>
				<Header />
				<NavBar username={username} />
				<Routes>
					<Route path="/" element={<AllArticles />} />
					<Route path="/errorpage" element={<ErrorPage />} />
					<Route path="/articles/:article_id" element={<SingleArticle />} />
					<Route path="/users" element={<AllUsers />} />
					<Route path="/users/login" element={<LogInPage />} />
					<Route path={`/users/${username}`} element={<UserPage />} />
				</Routes>
			</UserContext.Provider>
		</div>
	);
}

export default App;
