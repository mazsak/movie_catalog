import axios from 'axios';
import Cookie from "js-cookie"
import jwt_decode from 'jwt-decode'

const URL = "http://localhost:8080"


class RestController {

    async decodeUser() {
        const token = Cookie.get("token") ? Cookie.get("token").replace("Bearer ", "") : null;
        if (token !== null) {
            var decoded = jwt_decode(token).sub.split(",");
            console.log("decode",decoded);
            return await {
                username: decoded[0],
                mail: decoded[1],
                role: decoded[2]
        }
        }
        return await null;
    }

    async checkLogin() {
        const item = await this.decodeUser().then((r)=>{
            if (Object.keys(r).length !== 0 && r.constructor === Object) {
                return {
                    isLogin: r !== null,
                    isAdmin: r.role === "admin"
                };
            }
            return {
                isLogin: false,
                isAdmin: false
            };
        });
        console.log("item", item);
        return item;
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

    async POST(path, body, headers) {
        try {
            const response = await axios.post(URL + path,
                body, headers)
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
            const response = await axios.post(URL + '/users/login', {
                username: login,
                password: password
            })
            console.log("r", response)
            Cookie.set("token", "Bearer " + response.data.jwttoken);
            return true;
        } catch (error) {
            console.error("ERROR", error);
            return false;
        }
    }

    async register(user) {
        console.log('register', URL + '/users/register')
        return await this.POST("/users/register",
            user, {});
    }

    async addComment(comment) {
        const token = Cookie.get("token") ? Cookie.get("token") : null;
        const item = await this.decodeUser().then((r)=>{
            if (Object.keys(r).length !== 0 && r.constructor === Object) {
                return {
                    user: r,
                };
            }
            return null;
        });
        if (comment.name !== null && token !== null) {
            const config = {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: token
                }
            };
            console.log("add comment", "username", comment.name, "comment", comment, "config", config)
            await this.POST("/comments", comment, config);
        }
    }
    async getCommentsByUsername() {
        const token = Cookie.get("token") ? Cookie.get("token") : null;
        const username = Cookie.get("username") ? Cookie.get("username") : null;
        const item = await this.decodeUser().then((r)=>{
            if (Object.keys(r).length !== 0 && r.constructor === Object) {
                return {
                    user: r,
                };
            }
            return null;
        });
        console.log("item", item);
        return item;
        if (username !== null && token !== null) {
            const config = {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: token
                }
            };
            console.log('get links by username', URL + "/users/links", username)
            console.log("token " + token)
            return await this.POST("/users/links", { username: username }, config);

        }
    }

}

export default RestController;