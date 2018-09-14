<template>
  <v-app>
     
    <message-component></message-component>
    <v-navigation-drawer
   
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
   
      fixed
      app
    >
  <v-list sm3 xs3 md3 lg3>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <router-link to="/">HOME</router-link>
      </v-list-tile>
      <v-list-tile v-if="!isLoggedIn">
        <v-list-tile-action>
          <v-icon>usb</v-icon>
        </v-list-tile-action>
        <router-link to="/login" tag="li" v-if="!isLoggedIn">Login</router-link>
      </v-list-tile>
      <v-list-tile v-if="isLoggedIn">
        <v-list-tile-action>
          <v-icon>phone</v-icon>
        </v-list-tile-action>
         <li v-if="isLoggedIn" class="li-pointer"><a @click="logout">Logout {{ userEmail }}</a></li>
      </v-list-tile>
      <v-list-tile v-if="!isLoggedIn">
        <v-list-tile-action>
          <v-icon>web</v-icon>
        </v-list-tile-action>
      <router-link to="/register"  v-if="!isLoggedIn">Register</router-link>
      </v-list-tile>
         <v-list-tile v-if="isLoggedIn">
        <v-list-tile-action>
          <v-icon>how_to_reg</v-icon>
        </v-list-tile-action>
      <router-link to="/user-profile"  v-if="isLoggedIn">Perfil</router-link>
      </v-list-tile>
      <v-list-tile >
        <v-list-tile-action>
          <v-icon>face</v-icon>
        </v-list-tile-action>
      <router-link to="/foto"  >foto</router-link>
      </v-list-tile>
       <v-list-tile>
        <v-list-tile-action>
          <v-icon>replay</v-icon>
        </v-list-tile-action>
      <router-link :to="'/mirror/'+ cU "  >mirror</router-link>
      </v-list-tile>
      <v-list-tile v-if="isLoggedInAD">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
      <router-link to="/newp"  >cadastro</router-link>
      </v-list-tile>
         </v-list>
    </v-navigation-drawer>
    <test1 :drawer2="drawerx" v-on:welcome="sayHi"></test1>
    <v-toolbar
      app
      :clipped-left="clipped"
      class='pa-2'
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
     
      <v-toolbar-title v-text="title" class="body-2"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="caption" to="/foto2"  ><a>foto2</a></v-btn>
      
      <v-btn class="caption" :to="'/mirror2/'+ cU "  ><a>mirro</a></v-btn>
      <v-btn class="caption" @click.stop="drawerx = !drawerx"  ><a>test1</a></v-btn>
     <app-header v-on:welcome="sayHi" ></app-header>
    </v-toolbar>
    <v-content class="desrelative">
      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
 import {
        eventHub
    } from '@/main.js';
import { mapActions, mapGetters } from 'vuex';
  import Header from './components/Header.vue';
  import Test1 from './components/pagetest/Test1.vue';
  import MessageComponent from './components/common/MessageComponent.vue';
  export default {
    components: {
      appHeader: Header,
      MessageComponent,
		Test1
		
    },
  name: 'App',
  data () {
    return {
      clipped: true,
      drawer: false,
      drawerx: false,
      fixed: true,
      cU: 'gest',
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Loja dO Oculos'
    }},
methods: {
      ...mapActions(['getShoppingCart', 'listenToProductList', 'listenToTransactionsList', 'logout']),
	sayHi() {
      alert('Hi!');
    }
    },
    created() {
		eventHub.$on('runn', function(val) {
         
          console.log('rummmmmmm  ', val);
          
      });
      let uid = this.$store.getters.currentUser.uid;
      this.listenToProductList();
      this.listenToTransactionsList();
      this.getShoppingCart({uid, currentCart: this.$store.getters.cartItemList});
    },
	    computed: {
    ...mapGetters(['isLoggedIn', 'isLoggedInAD', 'cartValue', 'currentUser', 'cartItemList']),
   
   
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    }
  },
  }		

</script>
<style scoped="true" lang="scss">
  #reset-store-panel {
    position: fixed; bottom: 0px; right: 0px;
  }
	
  .margin-left-sm {
    margin-left: 0px;
  }
  html, body {
  
  }
	
  .wrapper1 {
    min-height: 80%;
    margin-bottom: -50px;
    padding-bottom: 50px;
  }
  footer {
    height: 50px;
    color: #666;
    padding: 10px 0 10px 0;
    font-size: 85%;
  }
  footer a {
    color: #999;
  }
  footer a:hover {
    color: #efefef;
  }
  .inline-block {
    display: inline-block;
  }
</style>