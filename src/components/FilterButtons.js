import React, { useState, useEffect } from "react";
import { getAllTopics } from "../utils/topicsApi";

const FilterButtons = ({ setCurrentTopic }) => {
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
				All Articles
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
		</section>
	);
};

export default FilterButtons;
