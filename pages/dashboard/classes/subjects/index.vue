<template>
  <div class="navbar-spacing padding-top-30">
    <div v-if="showDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Add Subject</h3>
        </div>
        <div class="popup-body">
          <div class="form-control">
            <label>Subject Name</label>
            <input v-model="subjectName" type="text" style="width:70%" />
          </div>
        </div>
        <div class="popup-action">
          <div class="pointer actions primary" @click="createSubject">Save</div>
          <div class="pointer actions" @click="closeDropdownPanel">Cancel</div>
        </div>
      </div>
    </div>

    <div class="holder">
      <div class="breadcrumbs">
        <nuxt-link to="/dashboard/classes">All Class</nuxt-link>
        > {{currentClass}}
      </div>
      <div class="column-padding pb-3" style="display: flex; justify-content: space-between;">
        <h2 style="display: flex; align-items: center;">All Subjects</h2>
        <button
          v-if="allowAdd"
          type="button"
          @click="openDropdownPanel"
          class="btn btn-primary"
        >+ Add New Subject</button>
      </div>
      <vue-good-table :columns="columns" :line-numbers="true" :rows="allSubjects">
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field === 'Name'">
            <p>{{props.row.Name | capitalize}}</p>
          </span>
          <span v-else-if="props.column.field === 'action'">
            <button
              @click="showChapters(props.row.SubjectID, props.row.Name)"
              type="button"
              class="btn btn-primary"
            >View Chapter</button>
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
          field: "action",
          width: "200px"
        }
      ],
      currentClass: this.$cookies.get("class"),
      allowAdd: this.$cookies.get("userType") == "sys" ? true : false,
      subjectName: "",
      showDropdown: false
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
    this.$cookies.remove("subject_id");
    this.$cookies.remove("subject_name");
  },
  methods: {
    showChapters: function(id, subject_name) {
      this.$cookies.set("subject_id", id, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      this.$cookies.set("subject_name", subject_name, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });

      this.$router.push("/dashboard/classes/subjects/chapters");
    },
    createSubject: function() {
      var payload = {
        name: this.subjectName
      };
      this.$store.dispatch("createSubject", payload).then(res => {
        this.$store.dispatch("getAllSubjects");
        this.closeDropdownPanel()
      });
    },
    openDropdownPanel: function() {
      this.showDropdown = true;
    },
    closeDropdownPanel: function() {
      this.showDropdown = false;
    }
  }
};
</script>



<style scoped>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

.popup-main {
  background-color: white;
  margin: auto;
  position: absolute;
  max-width: 400px;
  height: 350px;
  left: 260px;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 5px;
}

.popup-body {
  height: 300px;
  overflow: auto;
  padding: 30px;
}

.popup-title {
  padding: 15px 30px 10px;
  border-bottom: 1px solid #00000024;
}
.popup-action {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px -7px 10px 0px #0000000d;
}

.popup:after {
  background-color: rgba(0, 0, 0, 0.83);
  margin: auto;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.popup-action .actions {
  width: 100%;
  cursor: pointer;
  padding: 20px 0;
  text-align: center;
}

.popup-action .actions.primary {
  background-color: #f14836;
  color: white;
}

.popup-action .actions:nth-child(1) {
  border-radius: 0 0 0 5px;
}

.popup-action .actions:only-child {
  border-radius: 0 0 5px 5px;
}

.popup-action .actions:nth-child(n + 2) {
  border-left: 1px solid #cecece;
}
</style>
