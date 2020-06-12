

const URL = "http://localhost:8080"
class RestController{

    getPage(page, size, sortBy){
        console.log('get page films')
        return new Promise(resolve => {
            fetch(URL + "/films?page=" + page + "&size=" + size + "&sortBy=" + sortBy)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    getCountFilms(){
        console.log('get count films')
        return new Promise(resolve => {
            fetch(URL + "/films/count")
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }


}

export default RestController;