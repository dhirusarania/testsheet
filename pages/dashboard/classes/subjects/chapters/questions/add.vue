<template>
  <div class="navbar-spacing padding-top-30">
    <div class="holder">
      <div class="column-padding pb-3" style="display: flex; justify-content: space-between;">
        <h2 style="display: flex; align-items: center;">Add Question</h2>
      </div>
      <div>
        <div class="form-control question">
          <label>Write the Question</label>
          <vue-editor v-model="question" :editorToolbar="customToolbar"></vue-editor>
        </div>
        <h2 class="mt-5" style="display: flex; align-items: center;">Options</h2>
        <div class="form-control options">
          <label>Option A</label>
          <vue-editor v-model="option1" :editorToolbar="customToolbar"></vue-editor>
        </div>
        <div class="form-control options">
          <label>Option B</label>
          <vue-editor v-model="option2" :editorToolbar="customToolbar"></vue-editor>
        </div>
        <div class="form-control options">
          <label>Option C</label>
          <vue-editor v-model="option3" :editorToolbar="customToolbar"></vue-editor>
        </div>
        <div class="form-control options">
          <label>Option D</label>
          <vue-editor v-model="option4" :editorToolbar="customToolbar"></vue-editor>
        </div>
        <div class="form-control options">
          <label>Answer</label>

          <input
            class="inp-cbx"
            id="a"
            value="A"
            type="radio"
            v-model="answer"
            style="display: none;"
          />
          <label class="cbx" for="a">
            <span>
              <svg width="12px" height="9px" viewBox="0 0 12 9">
                <polyline points="1 5 4 8 11 1" />
              </svg>
            </span>
            <span>Option A</span>
          </label>

          <input
            class="inp-cbx"
            id="b"
            v-model="answer"
            value="B"
            type="radio"
            style="display: none;"
          />
          <label class="cbx" for="b">
            <span>
              <svg width="12px" height="9px" viewBox="0 0 12 9">
                <polyline points="1 5 4 8 11 1" />
              </svg>
            </span>
            <span>Option B</span>
          </label>

          <input
            class="inp-cbx"
            id="c"
            type="radio"
            value="C"
            v-model="answer"
            style="display: none;"
          />
          <label class="cbx" for="c">
            <span>
              <svg width="12px" height="9px" viewBox="0 0 12 9">
                <polyline points="1 5 4 8 11 1" />
              </svg>
            </span>
            <span>Option C</span>
          </label>

          <input
            class="inp-cbx"
            id="d"
            value="D"
            type="radio"
            v-model="answer"
            style="display: none;"
          />
          <label class="cbx" for="d">
            <span>
              <svg width="12px" height="9px" viewBox="0 0 12 9">
                <polyline points="1 5 4 8 11 1" />
              </svg>
            </span>
            <span>Option D</span>
          </label>
        </div>
      </div>
      <div class="mt-5 mb-5">
        <button @click="createQuestion" class="btn btn-primary">Submit Question</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Subjects",

  data() {
    return {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: 0,
      customToolbar: [["bold", "italic", "underline"]],
      columns: [
        {
          label: "Name",
          field: "Name",
          width: "100px"
        },
        {
          label: "Subject ID",
          field: "SubjectID",
          width: "300px"
        },
        {
          label: "Action",
          field: "details",
          width: "200px"
        }
      ]
    };
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },

  computed: mapState(["allSubjects"]),

  mounted() {
    this.$store.dispatch("getAllSubjects");
  },
  methods: {
    createQuestion: function() {


  

      var payload = {
        text: this.question,
        optionA: this.option1,
        optionB: this.option2,
        optionC: this.option3,
        optionD: this.option4,
        correctAnswer: this.answer
      };

      this.$store.dispatch("createQuestion", payload).then(res => {
        this.$store.dispatch("getAllSubjects");
      });
    }
  }
};
</script>


<style scoped>
.options {
  padding-top: 35px;
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  color: #00104b;
}

.cbx {
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}
.cbx span {
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}
.cbx span:first-child {
  position: relative;
  width: 24px;
  height: 24px;
  /* border-radius: 50%; */
  transform: scale(1);
  vertical-align: middle;
  border: 1px solid #b9b8c3;
  transition: all 0.2s ease;
}
.cbx span:first-child svg {
  position: absolute;
  z-index: 1;
  top: 8px;
  left: 6px;
  fill: none;
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}
.cbx span:first-child:before {
  content: "";
  width: 100%;
  height: 100%;
  background: #506eec;
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 50%;
  transition-delay: 0.2s;
}
.cbx span:last-child {
  margin-left: 8px;
}
.cbx span:last-child:after {
  /* content: ""; */
  position: absolute;
  top: 8px;
  left: 0;
  height: 1px;
  width: 100%;
  background: #b9b8c3;
  transform-origin: 0 0;
  transform: scaleX(0);
}
.cbx:hover span:first-child {
  border-color: #3c53c7;
}

.inp-cbx:checked + .cbx span:first-child {
  border-color: #3c53c7;
  background: #3c53c7;
  animation: check 0.6s ease;
}
.inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 0;
}
.inp-cbx:checked + .cbx span:first-child:before {
  transform: scale(2.2);
  opacity: 0;
  transition: all 0.6s ease;
}
.inp-cbx:checked + .cbx span:last-child {
  /* color: #B9B8C3; */
  transition: all 0.3s ease;
}
.inp-cbx:checked + .cbx span:last-child:after {
  transform: scaleX(1);
  transition: all 0.3s ease;
}

@keyframes check {
  50% {
    transform: scale(1.2);
  }
}
</style>