import axios from "axios";

const articlesApi = axios.create({
	baseURL: "https://nc-news-server-holly.herokuapp.com/api/articles/",
});

export const getAllArticles = () => {
	return articlesApi
		.get("/", { sort_by: "topic", order: "ASC" })
		.then((res) => {
			return res.data.articles;
		})
		.catch((err) => {
			window.location.replace("/errorpage");
			console.log(err);
		});
};

export const getSingleArticle = (id) => {
	return articlesApi
		.get(`/${id}`)
		.then((res) => {
			return res.data.article;
		})
		.catch((err) => {
			window.location.replace("/errorpage");
			console.log(err);
		});
};

export const getComments = (id) => {
	return articlesApi.get(`/${id}/comments`).then((res) => {
		return res.data.comments;
	});
};

export const upVoteArticle = (id) => {
	return articlesApi.patch(`/${id}`, { inc_votes: 1 }).then((res) => {
		return res.data;
	});
};
export const downVoteArticle = (id) => {
	return articlesApi.patch(`/${id}`, { inc_votes: -1 }).then((res) => {
		return res.data;
	});
};
