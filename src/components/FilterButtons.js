import React from "react";
const FilterButtons = ({ setOrder, setSortBy }) => {
	return (
		<section className="filterButtons">
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
