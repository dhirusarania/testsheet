<template>
  <div class="navbar-spacing padding-top-30">
    <div class="holder">
      <div class="column-padding pb-3" style="display: flex; justify-content: space-between;">
        <h2 style="display: flex; align-items: center;">All Classes</h2>
        <!-- <button type="button" class="btn btn-primary">+ Add New Class</button> -->
      </div>
      <vue-good-table :columns="columns" :rows="classes">
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field === 'action'">
            <button
              @click="showSubject(props.row.id)"
              type="button"
              class="btn btn-primary"
            >View Subjects</button>
          </span>
          <span v-else>{{ props.formattedRow[props.column.field] }}</span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Subjects",

  data() {
    return {
      classes: [
        {
          id: 6,
          class: 6
        },
        {
          id: 7,
          class: 7
        },
        {
          id: 8,
          class: 8
        },
        {
          id: 9,
          class: 9
        }
      ],
      columns: [
        {
          label: "Class id",
          field: "id",
          width: "100px"
        },
        {
          label: "Class",
          field: "class",
          width: "300px"
        },
        {
          label: "Action",
          field: "action",
          width: "300px"
        }
      ]
    };
  },
  methods: {
    showSubject: function(id) {

      this.$cookies.set("class", id, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });

      this.$router.push("/dashboard/classes/subjects");
    }
  }
};
</script>