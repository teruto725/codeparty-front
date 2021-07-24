<template>
  <v-container>
    <v-row justify="center">
      <h1>{{ contest.name }}</h1>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-card height="300">
          <v-card-text>
            {{ contest.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3">
        <v-card
          height="300"
          width="300"
          :to="'/contests/' + $route.params.id + '/codes'"
        >
          <v-card-title> コード </v-card-title>
          <v-card-text>
            他のユーザが提出したコードを確認できます。
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          height="300"
          width="300"
          :to="'/contests/' + $route.params.id + '/entry'"
        >
          <v-card-title> 提出 </v-card-title>
          <v-card-text>
            コードを提出できます。<br />これまでにあなたが提出したコード一覧も確認できます。
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          height="300"
          width="300"
          :to="'/contests/' + $route.params.id + '/rooms'"
        >
          <v-card-title> バトル </v-card-title>
          <v-card-text>
            これまでに行われたバトルを確認できます。<br />他の人とバトルをすることもできます。
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <router-view />
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
      const uri = "http://35.75.64.1:8080/contests/" + this.$route.params.id;
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