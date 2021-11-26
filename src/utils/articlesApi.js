import axios from "axios";

const articlesApi = axios.create({
	baseURL: "https://nc-news-server-holly.herokuapp.com/api/articles",
});
export const getAllArticles = ({ sortBy, order }) => {
	return articlesApi
		.get(`/?sort_by=${sortBy}&&order=${order}`)
		.then((res) => {
			return res.data.articles;
		})
		.catch((err) => {
			return err;
		});
};

export const getArticlesByTopic = ({ sortBy, order, topic }) => {
	return articlesApi
		.get(`/?sort_by=${sortBy}&&order=${order}&&topic=${topic}`)
		.then((res) => {
			return res.data.articles;
		})
		.catch((err) => {
			return err;
		});
};

export const getSingleArticle = (id) => {
	return articlesApi
		.get(`/${id}`)
		.then((res) => {
			return res.data.article;
		})
		.catch((err) => {
			return err;
		});
};

export const getComments = (id) => {
	return articlesApi
		.get(`/${id}/comments`)
		.then((res) => {
			return res.data.comments;
		})
		.catch((err) => {
			return err;
		});
};

export const upVoteArticle = (id) => {
	return articlesApi
		.patch(`/${id}`, { inc_votes: 1 })
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
};
export const downVoteArticle = (id) => {
	return articlesApi
		.patch(`/${id}`, { inc_votes: -1 })
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
};

export const addComment = ({ article_id, username, newComment }) => {
	return articlesApi
		.post(`/${article_id}/comments`, { username: username, body: newComment })
		.then((res) => {
			return res.data;
		})
		.then((err) => {
			return err;
		});
};
