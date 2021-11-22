import axios from "axios";

const articlesApi = axios.create({
	baseURL: "https://nc-news-server-holly.herokuapp.com/api/users/",
});

export const getAllArticles = () => {
	return articlesApi
		.get("/")
		.then((res) => {
			console.log(res.data.users);
			return res.data.users;
		})
		.catch((err) => {
			console.log(err);
		});
};
