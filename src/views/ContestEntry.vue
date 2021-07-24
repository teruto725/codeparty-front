<template>
<v-container>
    <v-card>
        <v-card-title>
            Entry
        </v-card-title>
        <v-card-text>
            <v-list-item
                v-for="code in codes" :key="code.id"
                color="thirdary"
            >
							<v-list-item-content>
									<v-list-item-title>{{code.id}}</v-list-item-title>
							</v-list-item-content>
            </v-list-item>
        </v-card-text>
        <v-card-actions>
            <v-form v-on:submit.prevent="postCode">
                <v-file-input
                    type="file" 
										v-on:change="fileSelected"
                    label="提出コード"
                    outlined
                ></v-file-input>
                <v-btn outlined type="submit" color = "primary">コード提出</v-btn>
            </v-form>
        </v-card-actions>
    </v-card>
</v-container>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      fileInfo :{},
      codes: [],
    };
  },
  created: function() {
      this.getUserCodes()
  },
  methods: {
		fileSelected(event){
			console.log(event)
			this.fileInfo = event.File
		},
    postCode() {
			console.log(this.$store.state.userToken )
      const uri = "http://35.75.64.1:8000/codes";
			let config = {
        headers: {
            "Content-Type": "multipart/form-data", 
            "Authorization": "Bearer "+this.$store.state.userToken
        }
      }
			let data = {
				contest_id: this.$route.params.id,
				file: this.fileInfo
			}
      axios.post(uri, data,config
      ).then(response => {
        console.log("success")
        console.log(response.data)
      });
			
    },
    getUserCodes() {
			console.log(this.$store.state.userToken )
      const uri = "http://35.75.64.1:8000/contests/"+this.$route.params.id+"/submitted";
      axios.get(uri, {
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": "Bearer "+this.$store.state.userToken 
        },
        data: {} 
      }).then(response => {
        console.log("success")
        console.log(response.data)
        this.codes = response.data;
      });
    },

  }
};
</script>
<style scoped>
</style>