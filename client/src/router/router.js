import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home/Home";
import History from "@/components/History";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "List",
      component: Home
    },
    {
      path: "/history",
      name: "History",
      component: History
    }
  ]
});
