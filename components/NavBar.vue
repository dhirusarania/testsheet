<template>
  <div>
    <div class="padding-top-20">
      <nav class="topnav box-shadow padding-left-10 padding-right-10 row">
        <div class="flex align-item col" style="width:100%; justify-content: space-between;">
          <div>
            <div class="visible-xs visible-sm">
              <a @click="openSidenav" class="pointer">
                <menu-icon class="feather-icon black"></menu-icon>
              </a>
            </div>
            <div class="visible-xs visible-sm">
              <p
                class="hide-on-large-only"
                style="line-height:64px;font-family:'Bold'; font-size: 17px;white-space: nowrap;"
              >Testsheet Dashboard</p>
            </div>
          </div>
          <div
            class="flex align-item col right hide-on-med-and-down"
            style="height:100%; justify-content:flex-end"
          >
            <div style="position:relative;margin-right:15px">
              <!-- <span
                class="feather-icon-badge bg-primary text-white h-5 w-5 absolute rounded-full text-xs flex items-center justify-center"
                style="top: 5px; right: 0px;position:absolute;border-radius:50px;width:20px;height:20px"
                >5</span
              >-->
            </div>
            <div class="flex align-item">
              <div style="padding-right:10px;line-height: 20px;">
                <p class="bold font-12">{{ username }}</p>
                <p class="font-10">{{ company_name }}</p>
              </div>
              <div>
                <!-- <img
                  src="~static/files/user.svg"
                  style="border-radius: 50px;width: 40px;height: 100%;"
                />-->
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <perfect-scrollbar id="mySidenav" class="sidenav hidden-xs hidden-sm padding-bottom-30">
      <div
        style="cursor:pointer; text-align:right;padding-right:20px"
        class="hide-on-large-only"
        @click="closeSidenav"
      >
        <i data-feather="x"></i>
      </div>
      <div class="dashboard-logo">
        <!-- <img src="~static/files/logo.png" class="sideNav__Logo" /> -->
        <h1 style="font-family:bold">Testsheet Dashboard</h1>
      </div>

      <p></p>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/classes">
          <i data-feather="square"></i>
          <span>Classes</span>
        </nuxt-link>
      </div>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/subjects">
          <i data-feather="book-open"></i>
          <span>Subjects</span>
        </nuxt-link>
      </div>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/questions">
          <i data-feather="pen-tool"></i>
          <span>Questions</span>
        </nuxt-link>
      </div>

      <p></p>
      <div class="navbar__parent">
        <div @click="logout" class="logout">
          <i data-feather="log-out"></i>
          <span>Logout</span>
        </div>
      </div>
      <p></p>
      <div class="navbar__parent">
        <div class>
          <span style="color:#c2cddc5c">Dashboard Version 0.0.1</span>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
// import feather from 'feather-icons'
import { MenuIcon } from "vue-feather-icons";

export default {
  data: () => ({
    active: false,
    currentUserEmail: "",
    pickup_count: 0,
    message_count: 0
  }),

  components: {
    MenuIcon
  },

  computed: {
    // active : $store.state.sidenavStatus
    username() {
      return this.$store.state.username;
    },
    company_name() {
      return this.$store.state.company_name;
    }
  },

  mounted() {
    feather.replace({ color: "white" });

    var vm = this;

    this.currentUserEmail = localStorage.getItem("currentUserEmail");

    $(".navbar__parent").click(function() {
      vm.closeSidenav();
    });

    if (this.$cookies.get("username") != undefined) {
      this.$store.commit("username", this.$cookies.get("username"));
      this.$store.commit("company_name", this.$cookies.get("company_name"));
    } else {
      console.log("cookieNot");
      this.$store.commit("username", 0);
      this.$store.commit("company_name", 0);
    }
  },
  methods: {
    openSidenav: function() {
      $("#mySidenav").addClass("open");
      $("body").addClass("overflow");
    },
    closeSidenav: function() {
      $("#mySidenav").removeClass("open");
      $("body").removeClass("overflow");
    },
    logout: function() {
      this.$cookies.removeAll();

      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.navbar__parent {
  /* padding: 0 15px; */
}

.sideNav__Logo {
  width: 40px;
  object-fit: contain;
  height: 100%;
}

p {
  margin: 0;
}

.sidenav {
  height: 100%;
  width: 260px;
  position: fixed;
  z-index: 950;
  top: 0;
  left: 0;
  background-color: #0c1013;
  transition: all 0.5s;
  padding-top: 0;
  /* box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.5); */
  overflow: auto;
  padding-bottom: 60px;
}

.sidenav p {
  padding: 32px 8px 17px 30px;
  text-decoration: none;
  font-size: 14px;
  color: #ffffff;
  display: block;
  transition: 0.3s;
}

.sidenav a {
  padding: 15px 28px;
  text-decoration: none;
  font-size: 13px;
  color: rgb(194, 205, 220);
  display: block;
  transition: 0.3s;
  width: 100%;
  display: flex;
  align-items: center;
}

.sidenav span {
  padding-left: 10px;
}

.sidenav a:hover {
  color: #4caf50;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

@media screen and (max-width: 991px) {
  .sidenav {
    transform: translate3d(-260px, 0, 0);
  }
  .sidenav.open {
    transform: translate3d(0, 0, 0);
  }
}

.breadcrumb {
  background-color: #0c1013;
}

p {
  margin: 0;
}

.topnav {
  height: 69px;
  background-color: #ffffff;
  box-shadow: 0 3px 10px rgba(62, 85, 120, 0.07);
}

.topnav > div {
  height: 69px;
}

.dashboard-logo {
  padding: 17px 8px 17px 30px;
  display: flex;
  height: 69px;
  align-items: center;
}

.dashboard-logo h1 {
  font-size: 15px;
  line-height: 23px;
  text-align: center;
  color: white;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 20px 10px;
  text-decoration: none;
  font-size: 17px;
  height: 62px;
}

.topnav a:hover {
  color: red;
}

.topnav a.active {
  background-color: #4caf50;
  color: white;
}

.notification {
  background-color: #ff9800;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  margin-left: 10px;
  text-align: center;
  padding: 0 !important;
  font-size: 12px;
  color: white;
  line-height: 20px;
  font-weight: bold;
}

.sidenav .nuxt-link-exact-active,
.sidenav .nuxt-link-active {
  color: white !important;
  background-color: #f14836 !important;
  box-shadow: 0px 6px 19px 0px rgba(224, 70, 54, 0.49) !important;
  border-radius: 0;
}

svg {
  width: 20px;
}

.flex {
  display: flex;
}

.align-item {
  align-items: center;
}

.logout {
  padding: 15px 28px;
  cursor: pointer;
  text-decoration: none;
  font-size: 13px;
  color: rgb(194, 205, 220);
  display: block;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  width: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
</style>
