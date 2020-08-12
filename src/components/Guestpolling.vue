<template>
  <div id="pollingpage">
    <!-- <ul>
      <li v-for="(item, index) in list_polls" v-bind:key="index">
        <div>
          <B>Q</B>
          {{item.title}}
        </div>
        <div v-for="(item, index) in item.options" v-bind:key="index">{{item.option}}</div>
      </li>
    </ul>-->
    <div id="body">
      <li v-for="(item, index) in list_polls" v-bind:key="index">
        <div id="container">
          <div class="item">
            <B>Q{{++index}}.</B>
            {{item.title}}
            <div v-for="(item, index) in item.options" v-bind:key="index">
              <input type="checkbox" @change="changeflag(item.option)" />
              {{item.option}}
            </div>
          </div>
        </div>
        <hr />
      </li>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Guestpolling",
 
  data() {
    return {
      checkflag: false,
      chooseoption: {},
    };
  },
  computed: {
    ...mapGetters({
      list_polls: "list_polls",
    }),
  },

  methods: {
    changeflag(option) {
      this.checkflag = !this.checkflag;
      this.chooseoption = option;
      // console.log(this.checkflag, this.chooseoption);
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

