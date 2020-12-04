<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col>
          <b-form-input placeholder="Nome" v-model="inpNome"></b-form-input>
        </b-col>
        <b-col>
          <b-form-input placeholder="Email" v-model="inpEmail"></b-form-input>
        </b-col>
        </b-row>
        <b-row>
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
  name: 'Home',
  data:function(){
    return {
      inpNome: "",
      inpEmail: "",
      pessoas:[],
      axios: axios.create({baseURL:"http://localhost:3000"})
    }
  },
  async mounted() {
    const res = await this.axios.get("/pessoa");
    this.pessoas = res.data;
  },
  methods:{
     enviar: async function(){
      await this.axios.post("/pessoa",{nome:this.inpNome,email:this.inpEmail});
    }
  }

}
</script>
