<template>
  <v-row justify="center">
    <v-card
      outlined
      style="background-color: transparent; margin: 20px; width: 100%"
      v-for="room in rooms"
      :key="room.id"
    >
      <v-container>
        <v-row style="padding: 5px">
          <v-col v-for="code in room.codes" :key="code.name">
            {{ code.name }}
          </v-col>
        </v-row>
        <v-row>
          <v-divider />
        </v-row>
        <v-row style="" justify="center">
          <v-col class="text-gray" style="color:gray;">
            {{ room.time }}
          </v-col>
          <v-spacer/>
          <v-col>
            <v-btn  outlined color="primary">Check Results</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-row>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      codeFile: {},
      rooms: [
        {
          id: 1,
          time: "2021-07-25-06-39",
          codes: [
            { name: "Random Man / user1" },
            { name: "Super Man / tanaka" },
            { name: "Sleeply Man / katuo" },
            { name: "Kitaro / watasi" },
          ],
        },
      ],
      codes: ["bottom_braker", "saikyo", "natto", "nurupo"],
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      dialog: false,
    };
  },
  created: function () {
    this.getRooms();
    this.getCodes();
  },
  methods: {
    selectedFile: function (e) {
      // 選択された File の情報を保存しておく
      e.preventDefault();
      let files = e.target.files;
      this.codeFile = files[0];
    },
    getRooms() {
      const uri =
        "http://35.75.64.1:8000/contests/" + this.$route.params.id + "/rooms";
      axios
        .get(uri, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.$store.state.userToken,
          },
          data: {},
        })
        .then((response) => {
          console.log("success");
          console.log(response.data);
          //this.rooms = response.data;
        });
    },
    getCodes() {
      const uri =
        "http://35.75.64.1:8000/contests/" + this.$route.params.id + "/codes";
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
          //this.codes = response.data;
        });
    },
  },
};
</script>
<style scoped>
</style>