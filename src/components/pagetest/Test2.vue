<template>
    <v-container grid-list-md>
            <v-layout wrap>
             <v-flex xs12 sm12 md12>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-expansion-panel
      v-model="panel"
      
    >
      <v-expansion-panel-content
       
      >
        <div slot="header">personal</div>
          <v-flex xs12 sm6 md4>
         <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="50"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      
      
      required
    ></v-text-field>
      </v-flex>
      </v-expansion-panel-content>
    </v-expansion-panel>
     
     
    
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                  chips
                ></v-autocomplete>
              </v-flex>
    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
            </v-flex>
            </v-layout>
          </v-container>
</template>
<script>
 import {
  mapActions, mapGetters
} from 'vuex';
import { ref, firebaseAuth, LetAuth } from '../../config/firebaseConfig';
  export default {
    data: () => ({
		uid:'',
		 panel: [],
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: false
    }),
  computed: {
    ...mapGetters(['isLoggedIn',  'currentUser']),
	   userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    }
	
  },
	  mounted (){
	  this.email = this.currentUser.email;
		  this.name = this.currentUser.displayName;
		  this.uid = this.currentUser.uid;
  },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
         /* axios.post('/api/submit', {
            name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })*/
			
	
			
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>