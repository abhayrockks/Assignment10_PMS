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
        <a @click="deletepoll(index)" class="button">Delete</a>
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PollList",

  computed: {
    ...mapGetters({
      list_polls: "list_polls",
    }),
  },

  methods: {
    ...mapActions(["deletepoll"]),
    async deletepoll(index) {
      await this.deletepoll({
        index: index,
      });
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

