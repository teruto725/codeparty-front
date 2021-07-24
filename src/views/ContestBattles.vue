<template>
  <v-row justify="center">
    <v-col class="col-3">
  <v-form v-on:submit.prevent="postRoom">
    <v-combobox
      v-model="code1"
      :items="codes"
      label="Choose Code"
      dense
    >
    </v-combobox>
    <v-combobox
      v-model="code2"
      :items="codes"
      label="Choose Code"
      dense
    >
    </v-combobox>
    <v-combobox
      v-model="code3"
      :items="codes"
      label="Choose Code"
      dense
    >
    </v-combobox>
    <v-combobox
      v-model="code4"
      :items="codes"
      label="Choose Code"
      dense
    >
    </v-combobox>
    <v-btn type="submit" color="primary" outlined>Battle!</v-btn>
    
  </v-form>
    </v-col>
  </v-row>
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
			dialog:false,
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
        //this.codes = response.data;
      });
    },
  },
};
</script>
<style scoped>
</style>