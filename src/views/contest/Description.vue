<template>
    <v-col style="padding:auto;" >
    <iframe :src="contest.description" 
    frameborder="0" 
    width="900" height="529"
    style="padding:auto;"
    allowfullscreen="true" 
    mozallowfullscreen="true" 
    webkitallowfullscreen="true">
    </iframe>
    </v-col>
</template>
<script>

import axios from "axios";
export default {
  data() {
    return {
      contest: {
        description:"https://docs.google.com/presentation/d/e/2PACX-1vR5I03dSZyVPP61z8l0WsbwWtE26sr5IZA-zfrXYN8M71W7VtH5U74kILBAXo-EZOOaL6BKlRNRzgep/embed?start=false&loop=false&delayms=3000" 
      },
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
          console.log(response.data.description);
          this.contest = response.data;
        });
    },
  },
}
</script>
<style scoped>
</style>