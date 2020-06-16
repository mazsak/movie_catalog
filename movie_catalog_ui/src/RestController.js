import axios from 'axios';
import Cookie from "js-cookie"

const URL = "http://localhost:8080"


class RestController {


    async checkLogin() {
        const user = Cookie.get("user") ? Cookie.get("user"): null;
        if (user !== null){
            console.log("user", user);
            return await {
                isLogin: user.token !== "",
                isAdmin: user.role === "admin"
            }
        }
    }

    async GET(path) {
        try {
            const response = await axios.get(URL + path)
            console.log("Response", response);
            return response.data
        } catch (error) {
            console.error("ERROR", error);
        }
    }

    async POST(path, body) {
        try {
            const response = await axios.post(URL + path,
                body)
            console.log("Response", response);
            return response.data
        } catch (error) {
            console.error("ERROR", error);
        }
    }

    async getPage(page, size, sortBy, desc) {
        console.log('get page films', URL + "/films?page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc)
        return await this.GET("/films?page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc);
    }

    async findFilmsByTitle(title, page, size, sortBy, desc) {
        console.log('find films by title', URL + "/films/filter?title=" + title + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc)
        return await this.GET("/films/filter?title=" + title + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc)
    }

    async findFilmsBetweenYear(yearFirst, yearSecond, page, size, sortBy, desc) {
        console.log('find films by year', URL + "/films/filter?yearFirst=" + yearFirst + "&yearSecond=" + yearSecond + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc)
        return await this.GET("/films/filter?yearFirst=" + yearFirst + "&yearSecond=" + yearSecond + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc);
    }

    async findFilmsByGenres(genres, page, size, sortBy, desc) {
        console.log('find films by geners', URL + "/films/filter?genres=" + genres + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc)
        return await this.GET("/films/filter?genres=" + genres + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc);
    }

    async findFilmsBetweenRate(rateFirst, rateSecond, page, size, sortBy, desc) {
        console.log('find films by rate', URL + "/films/filter?rateFirst=" + rateFirst + "&rateSecond=" + rateSecond + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc)
        return await this.GET("/films/filter?rateFirst=" + rateFirst + "&rateSecond=" + rateSecond + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc);
    }

    async findFilmsTopByTitle(title, page, size, sortBy, desc) {
        console.log('find films by title', URL + "/top/filter?title=" + title + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc)
        return await this.GET("/top/filter?title=" + title + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc);
    }

    async findFilmsBetweenTopYear(yearFirst, yearSecond, page, size, sortBy, desc) {
        console.log('find films by year', URL + "/top/filter?yearFirst=" + yearFirst + "&yearSecond=" + yearSecond + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc)
        return await this.GET("/top/filter?yearFirst=" + yearFirst + "&yearSecond=" + yearSecond + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc);
    }

    async findFilmsTopByGenres(genres, page, size, sortBy, desc) {
        console.log('find films by geners', URL + "/top/filter?genres=" + genres + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc)
        return await this.GET("/top/filter?genres=" + genres + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc);
    }

    async findFilmsTopBetweenRate(rateFirst, rateSecond, page, size, sortBy, desc) {
        console.log('find films by rate', URL + "/top/filter?rateFirst=" + rateFirst + "&rateSecond=" + rateSecond + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc)
        return await this.GET("/top/filter?rateFirst=" + rateFirst + "&rateSecond=" + rateSecond + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc);
    }

    async getFilm(id) {
        console.log('find films by rate', URL + "/films/" + id)
        return await this.GET("/films/" + id);
    }

    async getPageTop(page, size, sortBy, desc) {
        console.log('get page films', URL + "/top?page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc)
        return await this.GET("/top?page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&desc=" + desc);
    }

    async login(login, password) {
        console.log('register', URL + '/users/login')
        try {
            await axios.post(URL + '/users/login', {
                username: login,
                password: password
            }).then((r) => {
                const user = {
                    username: "",
                    token: "",
                    role: ""
                };
                Cookie.set("user", {
                    username: login,
                    token: "Bearer "+ r.data.token,
                    role: r.data.role
                });
            });
            return true;
        } catch (error) {
            console.error("ERROR", error);
            return false;
        }
    }

    async register(user) {
        console.log('register', URL + '/users/register')
        return await this.POST("/users/register",
            user);
    }

}

export default RestController;