<template>
  <v-container>
    <v-row justify="center">
      <v-col col-6>
        <v-img :src="user.icon"></v-img>
      </v-col>
      <v-col col-6>
        <v-form v-on:submit.prevent="post" v-model="valid">
          <v-label color="primary">Post</v-label>
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default{
  data(){
    return {
      user:{
        name:"aaa",
        email:"bbb",
        icon:"https://e7.pngegg.com/pngimages/505/761/png-clipart-login-computer-icons-avatar-icon-monochrome-black-thumbnail.png"
      }
    }
  }
}
</script>
