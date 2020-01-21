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
          <div class="pointer actions primary" @click="createChapter">Save</div>
          <div class="pointer actions" @click="closeDropdownPanel">Cancel</div>
        </div>
      </div>
    </div>

    <div class="holder">
      <div class="column-padding pb-3" style="display: flex; justify-content: space-between;">
        <h2 style="display: flex; align-items: center;">All Chapters</h2>
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
            chapterNumber : parseInt(this.chapterno),
            chapterName : this.chaptername
        }
        
        console.log(payload)

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
