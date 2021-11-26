import React, { useState, useEffect } from "react";
import { getAllTopics } from "../utils/topicsApi";

const FilterButtons = ({ setCurrentTopic, setOrder, setSortBy }) => {
	const [topics, setTopics] = useState([]);
	useEffect(() => {
		getAllTopics().then((topicsFromApi) => {
			setTopics(topicsFromApi);
		});
	}, []);
	return (
		<section className="filterButtons">
			<button
				key="allButton"
				onClick={() => {
					setCurrentTopic("All");
				}}
			>
				All
			</button>
			{topics.map((topic) => {
				return (
					<button
						key={`${topic.slug}Select`}
						onClick={() => {
							setCurrentTopic(topic.slug);
						}}
					>
						{topic.slug}
					</button>
				);
			})}
			<p>
				Order:
				<button
					key="ascOrderButton"
					onClick={() => {
						setOrder("ASC");
					}}
				>
					Ascending Order
				</button>
				<button
					key="descOrderButton"
					onClick={() => {
						setOrder("DESC");
					}}
				>
					Descending Order
				</button>
			</p>
			<p>
				Sort by:
				<button
					key="createdAt"
					onClick={() => {
						setSortBy("created_at");
					}}
				>
					Date created
				</button>
				<button
					key="topic"
					onClick={() => {
						setSortBy("topic");
					}}
				>
					Topic
				</button>
				<button
					key="author"
					onClick={() => {
						setSortBy("author");
					}}
				>
					Author
				</button>
				<button
					key="votes"
					onClick={() => {
						setSortBy("votes");
					}}
				>
					Most votes
				</button>
			</p>
		</section>
	);
};

export default FilterButtons;
