<template>
  <div id="editForm">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <form v-on:submit.prevent="adduser">
                <div class="form-group">
                  <input type="text" placeholder="Your Question..." v-model="poll.question" />
                </div>
                <br />
                <div v-for="(answer, index) in poll.answers" :key="index">
                  <input
                    :placeholder="'Answer ' + (index + 1)"
                    @focus="createNewInput(index)"
                    v-model="poll.answers[index]"
                    type="text"
                  />
                  <span class="delete" @click="deleteInput(index)">delete</span>
                </div>
                <br />
                <button>Update</button>
                <button id="cancel" @click="cancel">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "EditPoll",
  data() {
    return {
      poll: {
        question: this.prop_title,
        answers: [""],
      },
    };
  },

  props: {
    prop_title: { type: String, default: "" },
    prop_id: { type: String, default: "" },
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    ...mapActions(["editpoll"]),
    async adduser() {
      if (this.poll.question == "") {
        return alert("Please add or cancel");
      }

      await this.editpoll({
        title: this.poll.question,
        id: this.prop_id,
      }),
        this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
</style>