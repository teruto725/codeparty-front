<template>
<v-container>
  <v-row justify="center" 
  >
  <div v-if="displayResult">
    <iframe class="gameview" src="http://35.75.64.1:8000/static/unity/SquareDrop/index.html"></iframe>
    <v-icon @click="displayResult=false" color= "primary" >mdi-window-close</v-icon>
  </div>
  </v-row>
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
          <v-col class="text-gray" style="color: gray">
            {{ room.time }}
          </v-col>
          <v-spacer />
          <v-col>
            <v-btn outlined @click="showResult" color="primary">Check Results</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-row>

</v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      codeFile: {},
      displayResult: false,
      rooms: [
        {
          id: 1,
          time: "2021-07-25-06-39",
          codes: [
            { name: "Random Man" },
            { name: "Super Man" },
            { name: "Sleeply Man" },
            { name: "Kitaro" },
          ],
        },
      ],
    };
  },
  created: function () {
    this.getRooms();
  },
  methods: {
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
          this.rooms = response.data;
          this.rooms = this.rooms.map(function(room){
            var date =  room.time.split("T")[0].split("-")
            var time = room.time.split("T")[1].split(":")
            room.time = date[1]+"/"+date[2] + " " + time[0]+":"+time[1]
            return room
          });
          this.rooms.reverse()
        });
    },
    showResult(){
      console.log("show result");
      this.displayResult = true;
    }
  },
};
</script>
<style scoped>
.gameview{
  height:700px;
  width:1000px;
}
</style>