import axios from 'axios'
const USER_API_BASE_URL='http://localhost:8083/users'

class UserService{
    createUser(data){
      return axios.post(USER_API_BASE_URL+'/',data)
    }
}
export default new UserService()