<template>
  <v-container>
    <v-row style="margin: 10px">
      <v-col class="col-2"></v-col>
      <v-col class="col-6" height="200" style="margin: auto">
        <h1>Code Partyへようこそ</h1>
      </v-col>
      <v-col class="col-4" style="margin: auto">
        <v-img :src="require('@/assets/logo.png')" width="200"> </v-img>
      </v-col>
    </v-row>
    <v-col>
      <v-divider />
    </v-col>
    <v-row style="margin: 10px">
      <v-col class="col-2"></v-col>
      <v-col class="col-4" width="200" style="margin: auto">
        <v-img
          :src="require('@/assets/top/game-console.png')"
          style="margin: auto"
          width="180"
        >
        </v-img>
      </v-col>
      <v-col class="col-6" style="margin: auto">
        <h2>コーディングでゲーム対戦</h2>
      </v-col>
    </v-row>
    <v-col>
      <v-divider />
    </v-col>

    <v-row style="margin: 10px">
      <v-col class="col-2"></v-col>
      <v-col class="col-6" height="200" style="margin: auto">
        <h2>レーティングシステムで初心者も安心</h2>
      </v-col>
      <v-col class="col-4" style="margin: auto">
        <v-img :src="require('@/assets/top/pyramid.png')" width="200px">
        </v-img>
      </v-col>
    </v-row>
    <v-col>
      <v-divider />
    </v-col>
		
		<v-row style="margin: 10px">
      <v-col class="col-2"></v-col>
      <v-col class="col-4" width="200" style="margin: auto">
        <v-img
          :src="require('@/assets/top/free.png')"
          style="margin: auto"
          width="180"
        >
        </v-img>
      </v-col>
      <v-col class="col-6" style="margin: auto">
        <h2>基本プレイ無料 課金で強さが変わらない</h2>
      </v-col>
    </v-row>
    <v-col>
      <v-divider />
    </v-col>



    <v-row style="margin: 10px">
      <v-col class="col-2"></v-col>
      <v-col class="col-6" height="200" style="margin: auto">
        <h2>コンテスト参加はこちらまで</h2>
        <p>Discordに招待させていただきます。</p>
      </v-col>
      <v-col class="col-4" style="margin: auto"> 
				<v-card 
					elevation="0"
					style="background-color:transparent;"
				>
				<v-row justify="center">
					<v-form v-on:submit.prevent="postCode">
						<v-text-field 
							type="text" 
							placeholder="Email"
							>
						</v-text-field>
						<v-btn outlined style="padding:auto;" type="submit" color="primary">Apply</v-btn>
					</v-form>
				</v-row>
  </v-card>
			</v-col>
    </v-row>
    <v-col>
      <v-divider />
    </v-col>
  </v-container>
</template>
<script>
</script>
<style>
.panel {
  padding: auto;
}
</style>