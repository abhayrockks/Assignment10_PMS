<template>
  <div>
    <!-- <ul>
      <li v-for="(item, index) in list_polls" v-bind:key="index">
        <div>
          <B>Q</B>
          {{item.title}}
        </div>
        <div v-for="(item, index) in item.options" v-bind:key="index">{{item.option}} {{item.vote}}</div>
      </li>
    </ul>-->
    <div id="body">
      <li v-for="(item, poll_index) in list_polls" v-bind:key="poll_index">
        <a id="deletebutton" v-on:click="deletethepoll(item._id)" class="button">Delete</a>
        <a id="editbutton" v-on:click="editthepoll(item._id)" class="button">Edit</a>
        <div id="container">
          <div class="item">
            <B>Q</B>
            {{item.title}}
            <div v-for="(item_option, options_index) in item.options" v-bind:key="options_index">
              {{++options_index}}.
              {{item_option.option}}
              <span>{{item_option.vote}}</span>
            </div>
          </div>
        </div>
        <hr />
      </li>
      <EditPoll
        v-bind:prop_title="title"
        v-bind:prop_id="id"
        v-bind:prop_options="options"
        v-if="showModal"
        @close="showModal = false"
      />
    </div>
  </div>
</template>

<script>
import EditPoll from "./EditPoll";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CrudPoll",
  components: {
    EditPoll,
  },
  data() {
    return {
      title: "",
      options: [],
      showModal: false,
      id: "",
    };
  },
  computed: {
    ...mapGetters({
      list_polls: "list_polls",
    }),
  },

  methods: {
    ...mapActions(["deletepoll"]),
    async deletethepoll(id) {
      if (confirm("Do you really want to delete?")) {
        await this.deletepoll(id);
      }
    },
    editthepoll(id) {
      const editpoll = this.list_polls.filter(function (array) {
        return array._id === id;
      });
      this.title = editpoll[0].title;
      this.id = editpoll[0]._id;
      this.options = editpoll[0].options;
      this.showModal = true;
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
  background-color: rgb(165, 228, 193);
}
#deletebutton {
  margin-left: 45%;
  border-color: red;
}

#editbutton {
  border-color: rgb(4, 228, 60);
}

hr {
  border-top: 1px solid rgb(255, 81, 0);
}
</style>

