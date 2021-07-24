<template>
<div>
  <v-row>
      <v-alert
      dense
      outlined
      type="error"
      text
      v-model="error"
    >
      <strong>Name</strong> or <strong>Password</strong> is invalid.
    </v-alert>
  </v-row>
  <v-row justify="center">
    <v-form v-on:submit.prevent="doLogin" v-model="valid">
        <v-text-field  
          type="text" 
          required 
          placeholder="Name" 
          :rules="nameRules"
          v-model="user.name" 
        />
        <v-text-field  
          type="password" 
          required 
          placeholder="Password" 
          v-model="user.password"
          :rules="pathwordRules" 
        />
        <v-btn outlined type="submit" color = "primary">Sign In</v-btn>
    </v-form>
    </v-row>
    </div>
</template>
<script>
import axios from 'axios'
/* eslint-disable no-console */
// console log を有効化する
export default {
  data() {
    return {
      user: {},
      valid:false,
      error:false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      pathwordRules: [
        v => !!v || 'Password is required',
      ],
    };
  },
  methods: {
    doLogin() {
      const uri = "http://35.75.64.1:8080/token";
      console.log(this.user.name)
      axios.post(
        uri, 
        {
          name: this.user.name,
          password: this.user.password,
        }
      
      ).then(response => {
        console.log("success")
        console.log(response.data.tokens.access_token)
        if ( response.data.tokens.access_token === undefined ){
          this.error=true
        }
        else{
          this.$store.dispatch("auth", {
            userId: response.data.name,
            userToken: response.data.tokens.access_token
          });
          this.$_setIsLogined(true)
          this.$router.push("/");
        }
      }).catch(error => {
        console.log(error)
        this.error = true;
      });
    }
  }
}
</script>