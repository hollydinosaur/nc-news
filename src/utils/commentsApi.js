import axios from "axios";

const commentsApi = axios.create({
	baseURL: "https://nc-news-server-holly.herokuapp.com/api/comments",
});

export const upVoteComment = (id) => {
	return commentsApi
		.patch(`/${id}`, { inc_votes: 1 })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err.msg;
		});
};

export const downVoteComment = (id) => {
	return commentsApi
		.patch(`/${id}`, { inc_votes: -1 })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err.msg;
		});
};

export const deleteComment = (id) => {
	return commentsApi
		.delete(`/${id}`)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err.msg;
		});
};
