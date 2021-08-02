<template>
  <v-row justify="center">
    <v-col class="col-3">
  <v-form v-on:submit.prevent="postRoom">
    <v-combobox
      v-model="code1"
      :items="codes"
      item-text="name"
      item-value="id" 
      label="Choose Code"
      dense
    >
    </v-combobox>
    <v-combobox
      v-model="code2"
      :items="codes"
      item-text="name"
      item-value="id"
      label="Choose Code"
      dense
    >
    </v-combobox>
    <v-combobox
      v-model="code3"
      :items="codes"
      item-text="name"
      item-value="id"
      label="Choose Code"
      dense
    >
    </v-combobox>
    <v-combobox
      v-model="code4"
      :items="codes"
      item-text="name"
      item-value="id"
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
			
			],
			codes:[
				{
          "id":1,
          "name":"aaa"
        },
        {
          "id":2,
          "name":"bbb"
        },
        {
          "id":3,
          "name":"ccdc"
        },
        {
          "id":4,
          "name":"ddd"
        }
			],
			code1:"",
			code2:"",
			code3:"",
			code4:"",
			dialog:false,
    };
  },
  created: function () {
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
			let entriedCodes = [this.code1.id,this.code2.id,this.code3.id,this.code4.id]
      const uri = "http://35.75.64.1:8000/rooms/submit";
      let config = {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer "+this.$store.state.userToken
        }
      }
      let data = {
				contest_id: parseInt(this.$route.params.id),
				code_ids: entriedCodes
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
        this.codes = response.data;
      });
    },
  },
};
</script>
<style scoped>
</style>