import axios from "axios";

const topicsApi = axios.create({
	baseURL: "https://nc-news-server-holly.herokuapp.com/api/topics",
});

export const getAllTopics = () => {
	return topicsApi.get("/").then((res) => {
		return res.data.topics;
	});
};
