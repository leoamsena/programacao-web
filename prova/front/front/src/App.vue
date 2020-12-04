<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <b-input placeholder="Nome" v-model="nome"></b-input>
        </b-col>
        <b-col>
          <b-input placeholder="Email" v-model="email"> </b-input>
        </b-col>
        <b-col>
          <b-button @click="enviar">Enviar</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table :items="pessoas"></b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  data:function(){
    return {
      nome:"",
      email:"",
      axios: axios.create({baseURL:"http://localhost:3000"}),
      pessoas: []
    }
  },
  methods:{
    enviar:async function(){
      await this.axios.post("/pessoas",{nome:this.nome,email:this.email});
    }
  },
  mounted:async function(){
    const res = await this.axios.get("/pessoas");
    this.pessoas = res.data;
  }
}
</script>

<style>

</style>
