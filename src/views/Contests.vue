<template>
<v-container>
  <v-row justify="center">
    <h1>Contests</h1>
  </v-row>
  <v-row justify="center">
    <v-col cols="6" justify="center">
      <v-card 
          v-for="contest in contests" :key="contest.id"
          color="thirdary"
          >
          <v-row>
            <v-col cols = "1"></v-col>
              <v-col justify="center" class = "white--text">
                <v-card-title>{{contest.name}}</v-card-title>  
              </v-col>
            <v-card-actions>
                  <v-btn 
                    :to= '"/contests/" + contest.id'
                    class="2"
                    fab
                    color="white"
                    icon
                  > 
                    <v-icon small>mdi-pencil</v-icon> 
                  </v-btn> 
            </v-card-actions>
            <v-col cols = "1"></v-col>
          </v-row>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      data: "",
      new_worbook: {},
      contests :[]
    };
  },
  created: function() {
    this.getContests();
  },
  methods: {
    getContests() {
      const uri = "http://35.75.64.1:8080/contests";
      axios.get(uri, {
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": this.$store.state.userToken 
        },
        data: {} 
      }).then(response => {
        console.log("success")
        console.log(response.data[0].name)
        this.contests = response.data;
      });

    },
    
  }
};
</script>
<style scoped>
</style>