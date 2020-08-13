<template>
  <div id="editForm">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <form v-on:submit.prevent="update">
                <div class="form-group">
                  <input type="text" placeholder="Your Question..." v-model="poll.question" />
                </div>
                <br />
                <li v-for="(option, index) in this.prop_options" :key="index">
                  {{option.option}}
                  <span
                    class="delete"
                    @click="deleteInput(option.option,index)"
                  >delete</span>
                </li>
                <div id="extraoption">
                  <input
                    type="text"
                    placeholder="Wanna add extra option..."
                    v-model="poll.extraoption"
                  />
                </div>
                <br />
                <button id="updatebutton">Update</button>
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
  name: "EditPoll",
  data() {
    return {
      poll: {
        question: this.prop_title,
        extraoption: "",
      },
    };
  },

  props: {
    prop_title: { type: String, default: "" },
    prop_id: { type: String, default: "" },
    prop_options: { type: Array },
  },
  methods: {
    cancel() {
      this.$emit("close");
    },

    ...mapActions(["delete_option"]),
    deleteInput(option_text, index) {
      if (confirm("Do you really want to delete?")) {
        if (index > 0 || this.prop_options.length > 1) {
          this.prop_options.splice(index, 1);
        }
        if (option_text !== "") {
          this.delete_option({
            delete_option: option_text,
            id: this.prop_id,
          });
        }
      }
    },

    ...mapActions(["editpoll"]),
    async update() {
      if (
        this.poll.question === "" ||
        (this.prop_options.length === 0 && this.poll.extraoption === "")
      ) {
        return alert("Empty fields can't be updated");
      }
      if (this.prop_title === this.poll.question) {
        await this.editpoll({
          condition: "1",
          id: this.prop_id,
          option: this.poll.extraoption,
        });
      } else if (this.poll.extraoption === "") {
        await this.editpoll({
          condition: "2",
          title: this.poll.question,
          id: this.prop_id,
        });
      } else {
        await this.editpoll({
          title: this.poll.question,
          id: this.prop_id,
          option: this.poll.extraoption,
        });
      }
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}

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
  width: 50%;
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

#updatebutton {
  margin-left: 35%;
}
#cancelButton {
  margin-left: 2%;
}

#extraoption {
  margin-top: 5px;
}
</style>