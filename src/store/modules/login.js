import axios from 'axios'

export default {
    state: {
        error: false,
        login_progress: false,
        register_progress: false,
        user_exist: {},
        token_value: {},
    },
    getters: {
        api_error: state => state.error,
        user_exist: state => state.user_exist.error,
        logginuser: state => state.token_value.user,
        isLoggedIn: state => state.token_value.username
    },
    actions: {
        async login({ commit }, payload) {
            try {
                commit("login_progress", true);
                const response = await axios.post(`https://secure-refuge-14993.herokuapp.com/login?username=${payload.username}&password=${payload.password}`);
                delete payload.password;
                console.log(response.data)
                if (response.data.error == '0') {
                    commit("user_exist", response.data)
                    commit("extract_token", response.data.token)
                    commit("login_progress", false);
                } else {
                    commit("user_exist", response.data)
                    commit("login_progress", false);
                }
                return true
            } catch (err) {
                commit("login_progress", false);
                commit("login_fail", err)
                return false
            }
        },
        logout({ commit }) {
            commit("logout")
        },

        async register({ commit }, payload) {
            try {
                commit("register_progress", true);
                const response = await axios.post(`https://secure-refuge-14993.herokuapp.com/add_user?username=${payload.username}&password=${payload.password}&role=${payload.role}`);
                console.log(response.data)
                commit("register_progress", false);
                return true
            } catch (err) {
                commit("register_progress", false);
                commit("login_fail", err)
                return false
            }
        }
    },
    mutations: {
        extract_token: (state, token) => {
            function parseJwt(token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                return JSON.parse(jsonPayload);
            }
            state.token_value = parseJwt(token);
            console.log(state.token_value)
        },
        register_progress: (state, data) => {
            state.register_progress = data;
        },
        user_exist: (state, data) => {
            state.user_exist = data;
        },
        login_fail: (state, data) => {
            state.error = data;
        },
        login_progress: (state, data) => {
            state.login_progress = data;
        },
        logout: (state) => {
            state.token_value = {};
            state.user_exist = {};
        },
    }
}