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
          label="Source File"
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
      fileRules: [
        v => !!v || 'Source File is required',
      ],
    };
  },
  created: function () {
  },
  methods: {
    fileSelected(event) {
      console.log(event);
      event.preventDefault();
      this.fileInfo = event.File[0];
      console.log(this.fileInfo);
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
        
        axios.post(uri, formData, config).then((response) => {
          console.log("success");
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