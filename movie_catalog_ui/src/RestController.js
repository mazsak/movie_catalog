import axios from 'axios';

const URL = "http://localhost:8080"

const user = {
    username: "",
    token: "",
    role: ""
};

class RestController {


    async checkLogin() {
        console.log(
            user,
            user.token !== "",
            user.role === "admin"
        )
        return await {
            isLogin: user.token !== "",
            isAdmin: user.role === "admin"
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
            console.log("Response", response);
            user.username = await login;
            user.token = await response.data.token;
            user.role = await response.data.role;
            console.log("State in rest", this.state);
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