<template>
  <div id="submitForm">
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
                <div
                  v-for="(answer, index) in poll.answers"
                  :key="index"
                  class="answer"
                  :style="{zIndex: poll.answers.length - index}"
                >
                  <input
                    :placeholder="'Answer ' + (index + 1)"
                    @focus="createNewInput(index)"
                    v-model="poll.answers[index].answer"
                    type="text"
                  />
                  <span class="delete" @click="deleteInput(index)">delete</span>
                </div>
                <br />
                <button>Add</button>
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
  name: "Newpollform",
  data() {
    return {
      poll: {
        question: "",
        answers: [{ answer: "" }],
      },
    };
  },
  methods: {
    createNewInput(index) {
      if (this.poll.answers.length - 1 == index) {
        this.poll.answers.push({ answer: "" });
      }
    },

    deleteInput(index) {
      if (index > 0 || this.poll.answers.length > 1) {
        this.poll.answers.splice(index, 1);
      }
    },

    cancel() {
      this.$emit("close");
    },

    ...mapActions(["addnewpoll"]),
    async adduser() {
      if (this.poll.question == "") {
        return alert("Please add or cancel");
      }
      await this.addnewpoll({
        title: this.poll.question,
        options: this.poll.answers.filter(function (array) {
          return array.answer !== "";
        }),
      });
      if (this.user_exist == "0") {
        alert("Successfully Registered");
      } else {
        alert(this.api_error);
      }
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