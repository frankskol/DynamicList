import axios from 'axios'

const USER_URL = 'http://localhost:3306/dynamicl_DynamicList'

class UserService {
    retrieveAllUsers() {
        return axios.get(USER_URL);
    };

    createUser(user) {
        return axios.post(USER_URL+'/add', user)
    }
}

export default new UserService()
