<template>
  <div class="navbar-spacing padding-top-30">
    <div class="holder">
      <div class="breadcrumbs">
        <nuxt-link to="/dashboard/classes">All Class</nuxt-link>>
        <nuxt-link to="/dashboard/classes/subjects">{{currentClass}}</nuxt-link> >
        <nuxt-link to="/dashboard/classes/subjects/chapters">{{subject_name | capitalize}}</nuxt-link>
        > {{currentChapter | capitalize}}
      </div>
      <div class="column-padding pb-3" style="display: flex; justify-content: space-between;">
        <h2 style="display: flex; align-items: center;">All Questions</h2>
        <button type="button" @click="addQuestion" class="btn btn-primary">+ Add New Questions</button>
      </div>
      <vue-good-table :columns="columns" :line-numbers="true" :rows="allQuestions">
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field === 'Name'">
            <p>{{props.row.Name | capitalize}}</p>
          </span>
          <span v-else-if="props.column.field === 'Text'">
            <div v-html="props.row.Text"></div>
          </span>
          <span v-else>{{ props.formattedRow[props.column.field] }}</span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Questions",

  data() {
    return {
      columns: [
        {
          label: "QuestionID",
          field: "QuestionID",
          width: "100px"
        },
        {
          label: "Text",
          field: "Text",
          html: true,
          width: "300px"
        },
        {
          label: "CorrectAnswer",
          field: "CorrectAnswer",
          width: "300px"
        },
        {
          label: "Action",
          field: "details",
          width: "200px"
        }
      ],
      subject_name: this.$cookies.get("subject_name"),
      currentClass: this.$cookies.get("class"),
      currentChapter: this.$cookies.get("ChapterName")
    };
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },

  computed: mapState(["allQuestions"]),

  mounted() {
    this.$store.dispatch("getAllQuestions");
  },
  methods: {
    addQuestion: function() {
      this.$router.push("/dashboard/classes/subjects/chapters/questions/add");
    }
  }
};
</script>
