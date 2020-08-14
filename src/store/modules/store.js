import axios from 'axios'

export default {
    state: {
        token: {},
        error: false,
        login_progress: false,
        register_progress: false,
        add_poll: false,
        delete_poll: false,
        edit_poll: false,
        delete_option: false,
        add_option: false,
        submit_vote: false,
        submit_vote_response: false,
        user_exist: {},
        token_value: {},
        polls: {},
        updatedpoll: {}
    },
    getters: {
        submit_vote_response: state => state.submit_vote_response.error,
        api_error: state => state.error,
        user_exist: state => state.user_exist.error,
        logginUser: state => state.token_value.role,
        isLoggedIn: state => state.token_value.username,
        list_polls: state => state.polls,
    },
    actions: {
        async register({ commit }, payload) {
            try {
                commit("register_progress", true);
                const response = await axios.post(`https://secure-refuge-14993.herokuapp.com/add_user?username=${payload.username}&password=${payload.password}&role=${payload.role}`);
                commit("user_exist", response.data)
                commit("register_progress", false);
                return true
            } catch (err) {
                commit("register_progress", false);
                commit("login_fail", err)
                return false
            }
        },
        async login({ commit }, payload) {
            try {
                commit("login_progress", true);
                const response = await axios.post(`https://secure-refuge-14993.herokuapp.com/login?username=${payload.username}&password=${payload.password}`);
                delete payload.password;
                if (response.data.error == '0') {
                    commit("user_exist", payload)
                    commit("extract_token", response.data.token)
                    const listofpolls = await axios.get("https://secure-refuge-14993.herokuapp.com/list_polls");
                    commit("list_polls", listofpolls.data);
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
        async addnewpoll({ commit }, payload) {
            let options_string = "";
            payload.options.map((opt, index) => {
                if (index == payload.options.length - 1) {
                    options_string += opt;
                }
                else {
                    options_string += opt + '____';
                }
            })
            try {
                commit("add_poll", true);
                await axios.post(`https://secure-refuge-14993.herokuapp.com/add_poll?title=${payload.title}&options=${options_string}`);
                const listofpolls = await axios.get("https://secure-refuge-14993.herokuapp.com/list_polls");
                commit("list_polls", listofpolls.data);
                commit("add_poll", false);
                return true
            } catch (err) {
                commit("add_poll", false);
                commit("error", err)
                return false
            }
        },
        async deletepoll({ commit }, id) {
            try {
                commit(" delete_poll", true);
                await axios.post(`https://secure-refuge-14993.herokuapp.com/delete_poll?id=${id}`);
                const listofpolls = await axios.get("https://secure-refuge-14993.herokuapp.com/list_polls");
                commit("list_polls", listofpolls.data);
                commit(" delete_poll", false);
                return true
            } catch (err) {
                commit(" delete_poll", false);
                commit("error", err)
                return false
            }
        },
        async delete_option({ commit }, payload) {
            try {
                commit("delete_option", true);
                await axios.post(`https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${payload.id}&option_text=${payload.delete_option}`);
                const listofpolls = await axios.get("https://secure-refuge-14993.herokuapp.com/list_polls");
                commit("list_polls", listofpolls.data);
                commit("delete_option", false);
                return true
            } catch (err) {
                commit("delete_option", false);
                commit("error", err)
                return false
            }
        },
        async editpoll({ commit }, payload) {
            if (payload.condition === "1") {
                try {
                    commit("edit_poll", true);
                    await axios.post(`https://secure-refuge-14993.herokuapp.com/add_new_option?id=${payload.id}&option_text=${payload.option}`);
                    const listofpolls = await axios.get("https://secure-refuge-14993.herokuapp.com/list_polls");
                    commit("list_polls", listofpolls.data);
                    commit("edit_poll", false);
                    return true
                } catch (err) {
                    commit("edit_poll", false);
                    commit("error", err)
                    return false
                }
            } else if (payload.condition === "2") {
                try {
                    commit("edit_poll", true);
                    await axios.post(`https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${payload.id}&title=${payload.title}`);
                    const listofpolls = await axios.get("https://secure-refuge-14993.herokuapp.com/list_polls");
                    commit("list_polls", listofpolls.data);
                    commit("edit_poll", false);
                    return true
                } catch (err) {
                    commit("edit_poll", false);
                    commit("error", err)
                    return false
                }
            } else {
                try {
                    commit("edit_poll", true);
                    await axios.post(`https://secure-refuge-14993.herokuapp.com/add_new_option?id=${payload.id}&option_text=${payload.option}`);
                    await axios.post(`https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${payload.id}&title=${payload.title}`);
                    const listofpolls = await axios.get("https://secure-refuge-14993.herokuapp.com/list_polls");
                    commit("list_polls", listofpolls.data);
                    commit("edit_poll", false);
                    return true
                } catch (err) {
                    commit("edit_poll", false);
                    commit("error", err)
                    return false
                }
            }

        },

        async submitvote({ commit, state }, payload) {
            try {
                commit("submit_vote", true);
                let headers = {
                    'Content-Type': 'application/json',
                    'access_token': state.token,
                };
                const response = await axios.get(`https://secure-refuge-14993.herokuapp.com/do_vote?id=${payload.id}&option_text=${payload.option}`, { headers });
                commit("submit_vote_response", response.data)
                commit("submit_vote", false);
                return true
            } catch (err) {
                commit("submit_vote", false);
                commit("error", err)
                return false
            }
        }
    },
    mutations: {
        extract_token: (state, token) => {
            state.token = token;
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
            state.token = {};
            state.error = false;
        },
        list_polls: (state, data) => {
            state.polls = data.data;
        },
        add_poll: (state, data) => {
            state.add_poll = data;
        },
        error: (state, data) => {
            state.error = data;
        },
        delete_poll: (state, data) => {
            state.delete_poll = data;
        },
        edit_poll: (state, data) => {
            state.delete_poll = data;
        },
        delete_option: (state, data) => {
            state.delete_option = data;
        },
        add_option: (state, data) => {
            state.add_option = data;
        },
        submit_vote: (state, data) => {
            state.submit_vote = data;
        },
        submit_vote_response: (state, data) => {
            state.submit_vote_response = data;
        },
    }
}