<template>
  <v-container>
    <v-card>
      <v-card-title> バトルルーム </v-card-title>
			<v-card-actions>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          
					<v-btn outlined color="primary" dark v-bind="attrs" v-on="on">新規ルーム作成</v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            バトルルームの作成
          </v-card-title>

          <v-card-text>
            <v-form v-on:submit.prevent="postRoom">
							<v-combobox
								v-model="code1"
								:items="codes"
								label="Combobox1"
								multiple
								outlined
								dense
							>
							</v-combobox>
							<v-combobox
								v-model="code2"
								:items="codes"
								label="Combobox2"
								multiple
								outlined
								dense
							>
							</v-combobox>
							<v-combobox
								v-model="code3"
								:items="codes"
								label="Combobox3"
								multiple
								outlined
								dense
							>
							</v-combobox>
							<v-combobox
								v-model="code4"
								:items="codes"
								label="Combobox4"
								multiple
								outlined
								dense
							>
							</v-combobox>
							<v-btn type="submit" color="primary" outlined>Start Game!</v-btn>
							
						</v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

        
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
      rooms: [
				""
			],
			codes:[
				"bottom_braker",
				"saikyo",
				"natto",
				"nurupo"
			],
			code1:"",
			code2:"",
			code3:"",
			code4:"",
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
		postRoom() {
			let entriedCodes = [this.code1,this.code2,this.code3,this.code4]
      const uri = "http://35.75.64.1:8000/rooms";
      let config = {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer "+this.$store.state.userToken
        }
      }
      let data = {
				contest_id: this.$route.params.id,
				codes: entriedCodes
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
        "http://35.75.64.1:8000/contests/" + this.$route.params.id + "/rooms";
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
		getCodes() {
      const uri = "http://35.75.64.1:8000/contests/"+this.$route.params.id+"/codes";
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
  },
};
</script>
<style scoped>
</style>