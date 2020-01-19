<template>
  <div class="navbar-spacing padding-top-30">
    <div v-if="showDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Add Chapter</h3>
        </div>
        <div class="popup-body">
          <div class="form-control">
            <label>Chapter No.</label>
            <input v-model="chapterno" type="number" min="1" style="width:70%" />
          </div>
          <div class="form-control">
            <label>Chapter Name</label>
            <input v-model="chaptername" type="text" style="width:70%" />
          </div>
        </div>
        <div class="popup-action">
          <div class="pointer" @click="createChapter">Save</div>
          <div class="pointer" @click="closeDropdownPanel">Cancel</div>
        </div>
      </div>
    </div>

    <div class="holder">
      <div class="column-padding pb-3" style="display: flex; justify-content: space-between;">
        <h2 style="display: flex; align-items: center;">All Subjects</h2>
        <button type="button" class="btn btn-primary" @click="openDropdownPanel">+ Add New Chapter</button>
      </div>
      <vue-good-table :columns="columns" :line-numbers="true" :rows="chapters">
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field === 'Name'">
            <p>{{props.row.Name | capitalize}}</p>
          </span>
          <span v-else-if="props.column.field === 'action'">
            <button
              @click="showChapters(props.row.SubjectID)"
              type="button"
              class="btn btn-primary"
            >View Topic</button>
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
      showDropdown: false,
      chapterno: 1,
      chaptername: "",
      columns: [
        {
          label: "Name",
          field: "ChapterName",
          width: "100px"
        },
        {
          label: "Subject ID",
          field: "ChapterID",
          width: "300px"
        },
        {
          label: "Action",
          field: "action",
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

  computed: mapState(["chapters"]),

  mounted() {
    this.$store.dispatch("getAllChapters");
  },
  methods: {
    showChapters: function(id) {
      this.$cookies.set("subject_id", id, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });

      this.$router.push("/dashboard/classes/subjects/chapters");
    },
    createChapter: function(id) {

        var payload = {
            chapterNumber : this.chapterno,
            chapterName : this.chaptername
        }

            this.$store.dispatch('createChapters' , payload).then( res => {

                    this.$store.dispatch("getAllChapters");

            })


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
  padding: 30px 30px 16px;
  border-bottom: 1px solid #00000024;
}
.popup-action {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 25px;
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
</style>