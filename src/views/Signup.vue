<template>
<v-container>
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
          type="text" 
          required 
          placeholder="Email" 
          :rules="emailRules"
          v-model="user.email" 
        />
        <v-text-field  
          type="password" 
          required 
          placeholder="Password" 
          v-model="user.password"
          :rules="pathwordRules" 
        />
        <v-btn outlined type="submit" color = "primary">Sign Up</v-btn>
    </v-form>
    </v-row>
</v-container>
</template>
<script>
import axios from 'axios'
/* eslint-disable no-console */
// console log を有効化する
export default {
  data() {
    return {
      user: {},
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      pathwordRules: [
        v => !!v || 'Password is required',
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
    };
  },
  methods: {
    doLogin() {
      const uri = "http://35.75.64.1:8000/users";
      console.log(this.user.name)
      axios.post(
        uri, 
        {
            name: this.user.name,
            password: this.user.password,
            email: this.user.email,
        }
      ).then(response => {
        console.log("success")
        console.log(response.data.tokens.access_token)
        this.$store.dispatch("auth", {
          userId: response.data.name,
          userToken: response.data.tokens.access_token
        });

        this.$_setIsLogined(true)
        this.$router.push("Top");
      }).catch(error => {
        console.log(error)
      });
    }
  }
}
</script>
