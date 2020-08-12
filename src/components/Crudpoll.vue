<template>
  <div id="pollingpage">
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
      <li v-for="(item, index) in list_polls" v-bind:key="index">
        <a v-on:click="deletethepoll(item._id)" class="button">Delete</a>
        <a v-on:click="editthepoll(item._id)" class="button">Edit</a>
        <div id="container">
          <div class="item">
            <B>Q</B>
            {{item.title}}
            <div v-for="(item, index) in item.options" v-bind:key="index">
              {{item.option}}
              <span>{{item.vote}}</span>
            </div>
          </div>
        </div>
        <hr />
      </li>
      <EditPoll
        v-bind:prop_title="title"
        v-bind:prop_id="id"
        v-if="showModal"
        @close="showModal = false"
      />
    </div>
  </div>
</template>

<script>
import EditPoll from "./Editpoll";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Crudpoll",
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
  float: right;
}
</style>

