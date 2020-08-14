<template>
  <div id="pollingpage">
    <div id="body">
      <li v-for="(item, poll_index) in list_polls" v-bind:key="poll_index">
        <div id="container">
          <div class="item">
            <B>Q{{++poll_index}}.</B>
            {{item.title}}
            <div v-for="(item_option, options_index) in item.options" v-bind:key="options_index">
              <label>
                <input type="radio" name="abc" @change="select_item(item._id, item_option.option)" />
                {{item_option.option}}
              </label>
            </div>
            <a id="submitbutton" v-on:click="submit_vote(item._id)" class="button">Submit answer</a>
          </div>
        </div>
        <hr />
      </li>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GuestPolling",

  data() {
    return {
      vote: {},
    };
  },
  computed: {
    ...mapGetters({
      list_polls: "list_polls",
      submit_vote_response: "submit_vote_response",
    }),
  },

  methods: {
    select_item(id, option) {
      this.vote.id = id;
      this.vote.option = option;
    },
    ...mapActions(["submitvote"]),
    async submit_vote(id) {
      if (this.vote.id !== id) {
        return alert("Please select from the option");
      } else if (confirm("Are you sure ?")) {
        await this.submitvote(this.vote);
        this.vote = {};
      }
      if (this.submit_vote_response === 0) {
        return alert("Answer submitted successfully");
      } else if (this.vote.id) {
        return alert("Please confirm to submit");
      } else {
        alert(this.submit_vote_response);
      }
    },
  },
};
</script>


<style scoped>
li {
  list-style-type: none;
}

#container {
  display: flex;
  padding-top: 14px;
  justify-content: center;
}

span {
  float: right;
  padding-left: 70px;
}

a {
  margin-top: 10px;
  float: right;
}

#submitbutton {
  margin-right: 45%;
  border-color: rgb(4, 120, 228);
}

hr {
  border-top: 1px solid rgb(255, 0, 119);
}
</style>

