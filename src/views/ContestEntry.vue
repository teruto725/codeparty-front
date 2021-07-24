<template>
  <v-card 
    class="col-3"
    elevation="0"
    style="background-color:transparent;"
  >
    <v-row justify="center">
      <v-form v-on:submit.prevent="postCode">
        <v-text-field 
          type="text" 
          :rules="nameRules" 
          v-model="newCode.name"
          placeholder="code name"
          >
        </v-text-field>
        <v-file-input
          type="file"
          v-on:change="fileSelected"
          label="File"
          v-model="newCode.file"
        ></v-file-input>
        <v-btn outlined style="padding:auto;" type="submit" color="primary">Submit Code</v-btn>
      </v-form>
    </v-row>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      fileInfo: {},
      codes: [],
      newCode: {},
      nameRules: [
        v => !!v || 'Code name is required',
      ],
    };
  },
  created: function () {
    this.getUserCodes();
  },
  methods: {
    fileSelected(event) {
      console.log(event);
      this.fileInfo = event.File;
    },
    postCode() {
      console.log(this.$store.state.userToken);
      const uri = "http://35.75.64.1:8000/codes";
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.userToken,
        },
      };
      let data = {
        contest_id: this.$route.params.id,
        file: this.fileInfo,
      };
      axios.post(uri, data, config).then((response) => {
        console.log("success");
        console.log(response.data);
      });
    },
    getUserCodes() {
      console.log(this.$store.state.userToken);
      const uri =
        "http://35.75.64.1:8000/contests/" +
        this.$route.params.id +
        "/submitted";
      axios
        .get(uri, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state.userToken,
          },
          data: {},
        })
        .then((response) => {
          console.log("success");
          console.log(response.data);
          this.codes = response.data;
        });
    },
  },
};
</script>
<style scoped>
</style>