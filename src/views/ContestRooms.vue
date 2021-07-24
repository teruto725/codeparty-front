<template>
  <v-container>
    <v-card>
      <v-card-title> バトルルーム </v-card-title>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          
					<v-btn outlined color="primary" dark v-bind="attrs" v-on="on">新規ルーム作成</v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Privacy Policy
          </v-card-title>

          <v-card-text>
            
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card-actions>
        
      </v-card-actions>
      <v-card-text>
        <v-list-item v-for="room in rooms" :key="room.id" color="thirdary">
          <v-list-item-content>
            <v-list-item-title>{{ room.id }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      codeFile: {},
      rooms: [],
    };
  },
  created: function () {
    this.getRooms();
  },
  methods: {
    selectedFile: function (e) {
      // 選択された File の情報を保存しておく
      e.preventDefault();
      let files = e.target.files;
      this.codeFile = files[0];
    },
		postRoom() {
      const uri = "http://35.75.64.1:8080/rooms";
      let config = {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer "+this.$store.state.userToken
        }
      }
      let data = {
				contest_id: this.$route.params.id,
				codes: []
      }
      axios.post(uri,data, config
        ).then(response => {
        console.log("success");
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
    },
    getRooms() {
      const uri =
        "http://35.75.64.1:8080/contests/" + this.$route.params.id + "/rooms";
      axios
        .get(uri, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer "+this.$store.state.userToken,
          },
          data: {},
        })
        .then((response) => {
          console.log("success");
          console.log(response.data);
          this.rooms = response.data;
        });
    },
  },
};
</script>
<style scoped>
</style>