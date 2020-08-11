import axios from 'axios'

export default {
    state: {
        error: false,
        login_progress: false,
        register_progress: false,
        add_poll: false,
        delete_poll: false,
        user_exist: {},
        token_value: {},
        polls: {},
        search: {},
        updatedpoll: {}
    },
    getters: {
        filter_data: state => state.search,
        api_error: state => state.error,
        user_exist: state => state.user_exist.error,
        logginuser: state => state.token_value.user,
        isLoggedIn: state => state.token_value.username,
        list_polls: state => state.polls,
    },
    actions: {
        async login({ commit }, payload) {
            try {
                commit("login_progress", true);
                const response = await axios.post(`https://secure-refuge-14993.herokuapp.com/login?username=${payload.username}&password=${payload.password}`);
                delete payload.password;
                if (response.data.error == '0') {
                    commit("user_exist", payload)
                    commit("extract_token", response.data.token)
                    commit("login_progress", false);
                } else {
                    commit("user_exist", response.data)
                    commit("login_progress", false);
                }
                if (payload.user === 'Admin') {
                    const listofpolls = await axios.get("https://secure-refuge-14993.herokuapp.com/list_polls");
                    commit("list_polls", listofpolls.data);
                    console.log(listofpolls.data)
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
                await axios.post(`https://secure-refuge-14993.herokuapp.com/add_user?username=${payload.username}&password=${payload.password}&role=${payload.role}`);
                commit("register_progress", false);
                return true
            } catch (err) {
                commit("register_progress", false);
                commit("login_fail", err)
                return false
            }
        },

        async addnewpoll({ commit }, payload) {
            try {
                commit("add_poll", true);
                const response = await axios.post(`https://secure-refuge-14993.herokuapp.com/add_poll?title=${payload.title}%20polll&options=${payload.options[0].answer}`);
                commit("update_list", response.data)
                commit("add_poll", false);
                return true
            } catch (err) {
                commit("add_poll", false);
                commit("error", err)
                return false
            }
        },

        async deletepoll({ commit }, index) {
            console.log(index)
            try {
                commit(" delete_poll", true);
                const response = await axios.post(`https://secure-refuge-14993.herokuapp.com/delete_poll?id=${index}`);
                console.log(response)
                commit(" delete_poll", false);
                return true
            } catch (err) {
                commit(" delete_poll", false);
                commit("error", err)
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
            state.polls = {};
            state.updatedpoll = {};
            state.search = {};
        },
        list_polls: (state, data) => {
            state.polls = data.data;
            state.search = data.data.filter(function (array) {
                // console.log(array.title, "Hiiii")
                return array.title === "abhay";
            })
        },
        add_poll: (state, data) => {
            state.add_poll = data;
        },
        error: (state, data) => {
            state.error = data;
        },
        update_list: (state, data) => {
            state.updatedpoll = data.data;
            state.polls = Object.assign(state.polls, state.updatedpoll);
        },
        delete_poll: (state, data) => {
            state.delete_poll = data;
        },
    }
}