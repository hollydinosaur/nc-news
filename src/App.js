import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import AllArticles from "./components/AllArticles";

function App() {
	const [username, setUsername] = useState("");
	return (
		<div className="App">
			<Header />
			<NavBar username={username} />
			<Routes>
				<Route path="/" element={<AllArticles />} />
			</Routes>
		</div>
	);
}

export default App;
