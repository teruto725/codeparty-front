<template>
  <v-container>
    <v-row justify="center">
      <h1>{{ contest.name }}</h1>
    </v-row>
    <v-row style="padding:10px">
      <v-divider/>
    </v-row>
    <v-row>
      <v-col align="center">
      <v-tabs
      align-with-title
       grow centered color="primary"
      background-color="background"
      >
        
        <v-tab
          :to="'/contests/' + $route.params.id + '/description'"
        >
        Description
        </v-tab>
        <v-tab
          :to="'/contests/' + $route.params.id + '/tutorial'"
        >
        Tutorial
        </v-tab>
        <v-tab
          :to="'/contests/' + $route.params.id + '/entry'"
        >
        Submit
        </v-tab>
        <v-tab
          :to="'/contests/' + $route.params.id + '/battles'"
        >
        Battles
        </v-tab>
        <v-tab
          :to="'/contests/' + $route.params.id + '/rooms'"
        >
        Results
        </v-tab>
      </v-tabs>
      </v-col>
    </v-row>
    <v-row style="padding:10px">
      <v-divider/>
    </v-row>
    <v-row justify="center">
      <router-view />
    </v-row>
    
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      contest: {},
    };
  },
  created: function () {
    this.getContest();
  },
  methods: {
    getContest() {
      const uri = "http://35.75.64.1:8000/contests/" + this.$route.params.id;
      axios
        .get(uri, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$store.state.userToken,
          },
          data: {},
        })
        .then((response) => {
          console.log("success");
          console.log(response.data);
          this.contest = response.data;
        });
    },
  },
};
</script>
<style scoped>
</style>