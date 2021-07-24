<template>
<v-container>
    <v-card>
        <v-card-title>
            Codes
        </v-card-title>
        <v-card-text>
            <v-list-item
                v-for="code in codes" :key="code.id"
                color="thirdary"
            >
                <v-list-item-content>
                    <v-list-item-title>{{code.id}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-card-text>
    </v-card>
</v-container>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      contest :{},
      codes :[]
    };
  },
  created: function() {
    this.getContest();
  },
  methods: {
    getContest() {
      const uri = "http://35.75.64.1:8080/contests/"+this.$route.params.id+"/codes";
      axios.get(uri, {
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": this.$store.state.userToken 
        },
        data: {
        } 
      }).then(response => {
        console.log("success")
        console.log(response.data)
        this.codes = response.data;
      });
    },
  }
};
</script>
<style scoped>
</style>