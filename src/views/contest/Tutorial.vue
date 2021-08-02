<template>
<v-container>
  <v-row justify="center">
    {{contest.tutorial}}
  </v-row>
</v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      contest: {
        tutorial:"adfs"
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
          console.log(response.data.tutorial);
          //this.contest = response.data;
        });
    },
  },
}
</script>
<style scoped>
</style>