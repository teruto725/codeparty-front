<template>
  <v-container>
    <v-row justify="center">
      <h1>Choose Content</h1>
    </v-row>
    <v-row style="padding: 10px">
      <v-divider />
    </v-row>
    <v-row justify="center">
      <v-col 
				justify="center" 
				v-for="contest in contests"
				:key="contest.id"
				class ="col-4"
				>
        <v-card
					elevation="0"
          color="background"
					style="padding: 10px;"
          :to="'/contests/' + contest.id"
          height="300px"
          width = "200px"
        >
          <v-img
      :src="contest.thumb"
    ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      data: "",
      new_worbook: {},
      contests: [
				{
					id:1,
					name:"square drop",
					thumb:"square_drop.png",
				},
				{
					id:2,
					name:"hex",
					thumb:"hex.png"
				},
				{
					id:3,
					name:"uso",
					thumb:"uso.png"
				},
			],
    };
  },
  created: function () {
    this.getContests();
  },
  methods: {
    getContests() {
      const uri = "http://35.75.64.1:8000/contests";
      axios
        .get(uri, {
          headers: {
            "Content-Type": "application/json",
          },
          data: {},
        })
        .then((response) => {
          console.log("success");
          console.log(response.data[0].name);
          this.contests = response.data;
        });
    },
  },
};
</script>
<style scoped>
</style>