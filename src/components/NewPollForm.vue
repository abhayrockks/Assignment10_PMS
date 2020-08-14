<template>
  <div id="submitForm">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <form>
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
                <button id="addButton" @click="addpoll">Add</button>
                <button id="cancelButton" @click="cancel">Cancel</button>
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
        answers: [""],
      },
    };
  },
  methods: {
    createNewInput(index) {
      if (this.poll.answers.length - 1 == index) {
        this.poll.answers.push("");
      }
    },

    deleteInput(index) {
      if (index > 0 || this.poll.answers.length === 0) {
        this.poll.answers.splice(index, 1);
      }
    },

    cancel() {
      this.$emit("close");
    },

    ...mapActions(["addnewpoll"]),
    async addpoll() {
      const answerLength = this.poll.answers.length;
      if (this.poll.question === "" || answerLength <= "2") {
        return alert("Please add a question with atleast 2options or cancel");
      }
      await this.addnewpoll({
        title: this.poll.question,
        options: this.poll.answers.filter(function (array) {
          return array !== "";
        }),
      });
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
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  margin-top: 200px;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

form {
  display: initial;
  text-align: center;
}

#addButton {
  margin-left: 35%;
}

#cancelButton {
  margin-left: 2%;
}
</style>