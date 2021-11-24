import axios from "axios";

const usersApi = axios.create({
	baseURL: "https://nc-news-server-holly.herokuapp.com/api/users/",
});

export const getAllUsers = () => {
	return usersApi.get("/").then((res) => {
		return res.data.users;
	});
};

export const getUserByUsername = (username) => {
	return usersApi
		.get(`/${username}`)
		.then((res) => {
			return res.data.user;
		})
		.catch((err) => {
			console.log(err);
		});
};
