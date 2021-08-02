<template>
<v-container >
  <v-row justify="center">
          <v-alert
      dense
      outlined
      type="success"
      text
      v-model="success"
    >
      <strong>{{responseName}}</strong> was submitted.
    </v-alert>
  </v-row>
  <v-row justify="center">
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
          label="Source File"
          v-model="newCode.file"
        ></v-file-input>
        <v-btn outlined style="padding:auto;" type="submit" color="primary">Submit Code</v-btn>
      </v-form>
    </v-row>
  </v-card>
  </v-row>
</v-container>
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
      fileRules: [
        v => !!v || 'Source File is required',
      ],
      success: false,
      responseName: ""
    };
  },
  created: function () {
  },
  methods: {
    fileSelected(event) {
      this.fileInfo = event;
    },
    postCode() {
      let formData = new FormData()
      console.log(this.fileInfo);
      if(this.fileInfo){
        formData.append("file",this.fileInfo) 
        formData.append("name",this.newCode.name)
        formData.append("contest_id",this.$route.params.id)
        console.log(formData)
        const uri = "http://35.75.64.1:8000/codes";
        let config = {
          headers: {
            "Authorization": "Bearer " + this.$store.state.userToken,
          },
        };
        
        axios.post(uri, formData, config)
        .then((response) => {
          console.log("success");
          console.log(response.data);
          this.success = true
          this.responseName = response.data.name
          this.newCode = {}
        })
        .catch((response) => {
          console.log("falut")
          console.log(response.data);
        });
      }
      else{
        console.log("else")
      }
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>
<style scoped>
</style>