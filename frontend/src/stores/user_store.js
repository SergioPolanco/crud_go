import { observable, action, runInAction } from 'mobx'
import Axios from 'axios'

class UserStore {
    @observable users = [];
    @observable error = false;
    @observable loading = false;

    @action
    getAllUsers = async () => {
        let response = null
        try {
            response = await Axios.get('http://localhost:1323/users')
            this.setUsers(response.data)
        } catch (error) {
            // Alert.error('Error', {
            //     position: 'bottom-right',
            //     effect: 'bouncyflip',
            //     timeout: 'none'
            // })
            runInAction(() => {
                this.error = true
            })
        }
    }

    @action
    setUsers = users => {
        this.users = users
    }
}

export default UserStore