<template>
 <div>


    <v-toolbar flat color="white">
      <v-toolbar-title>Edit transactionsList</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.thumbnail_url" label="thumbnail_url"></v-text-field>
                </v-flex>
                 <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.mask_url" label="mask_url"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.title" label="title"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.description" label="description"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.id" label="id"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.price" label="price"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.quantity" label="quantity"></v-text-field>
                </v-flex>
              
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td v-for="(item, uid, i, data) in props.item"  >{{uid}}</td>
    <td >
    <div v-for="(value, key, index) in props.item" >
    	
    {{ --items.length }}
    	
    </div>
    
    </td>      
  

  
 	  <td v-for="(value, key, index) in props.item"  >
 	    <v-expansion-panel>
    <v-expansion-panel-content
    
    >
      <div slot="header">Item</div>
  	  <app-ordens-item   v-for="(value, key, index) in value" :cartItem="value" :key="value.key" ></app-ordens-item>
  	<tr>
        <td class="text-center" v-for="(value, key, index) in props.item"v-bind:valuex="totalValue(value)"  > Total{{ oi}} </td>
        
      </tr>
       
         </v-expansion-panel-content>
  </v-expansion-panel> 
           </td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
	import { ref, firebaseAuth } from '../../config/firebaseConfig';
	import {
  mapActions,
  mapGetters
} from 'vuex';
	
	import OrdensItem from '../admin/OrdensItem';
	export default {
		components:{
		appOrdensItem: OrdensItem
	},
    data: () => ({
		idz:'',
      dialog: false,
      headers: [
        {
          text: 'Item Name',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Id', value: 'id' },
        { text: 'image', value: 'thumbnail_url' },
        { text: 'Mask', value: 'mask_url' },
        /*{ text: 'tile', value: 'title' },*/
        { text: 'Description', value: 'description' },
        { text: 'Price', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
		valuesx:'',
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        description:'',
        id:0,
        price:0,
        quantity:0,
        thumbnail_url:'',
        title:'',
		  mask_url:''
      },
      defaultItem: {
        name: '',
         description:'',
        id:0,
        price:0,
        quantity:0,
        thumbnail_url:'',
        title:'',
		    mask_url:''
      }
    }),

    computed: {
		
		 ...mapGetters(['transactionsItemList']),
	
	items(){
		return  this.transactionsItemList;
	},
oi(){
	return this.valuesx;
},
	
      formTitle () {
		  
		  
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
		 this.listenToTransactionsList();
		 this.desserts = this.$store.getters.transactionsItemList;
      this.initialize()
    },

    methods: {
		 ...mapActions(['listenToTransactionsList']),
      initialize () {
        this.desserts = this.$store.getters.transactionsItemList
      },
	totalValue(val) {
			
				
				let res = 0;
					val.map(item => {
					res += item.price * item.quantity;
				});
		
		
		
	console.log(res);
			 this.valuesx= res;
			},
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
		  return ref.child("transactionsList/"+ index + '/').remove();
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
			var jk = {};
			var ix = this.editedIndex;
		jk = this.editedItem;	
 confirm('Are you sure you want to UPDATE this item?') &&  Object.assign(this.desserts[this.editedIndex], this.editedItem);
ref.child("transactionsList/").once("value")
  .then(function(snapshot) {
  var idz = snapshot.val().length; // {first:"Ada",last:"Lovelace"}

	console.log(idz);
	
	return ref.child("transactionsList/"+ ix + '/').update(jk);
  });

        } else {
          this.desserts.push(this.editedItem)
		var jj = {};
		jj = this.editedItem;	
ref.child("transactionsList/").once("value")
  .then(function(snapshot) {
   var idz = snapshot.val().length; // {first:"Ada",last:"Lovelace"}
 
	console.log(idz);
	
	return ref.child("transactionsList/"+ idz + '/').set(jj);
  });

        }
        this.close()
      }
    }
  }
	
	
</script>

<style>


</style>
