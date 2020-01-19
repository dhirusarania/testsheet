<template>
  <div class="navbar-spacing padding-top-30">
    <div class="holder">
      <div class="column-padding pb-3" style="display: flex; justify-content: space-between;">
        <h2 style="display: flex; align-items: center;">All Topic</h2>
        <button type="button" class="btn btn-primary">+ Add New Subject</button>
      </div>
      <vue-good-table :columns="columns" :line-numbers="true" :rows="allSubjects">
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field === 'Name'">
            <p>{{props.row.Name | capitalize}}</p>
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
  name: "Subjects",

  data() {
    return {
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
  }
};
</script>