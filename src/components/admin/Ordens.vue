<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Order</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>      
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-0 table-striped"
        >
          <template  slot="items" slot-scope="props">

 
  <td v-for="(item, uid, i, data) in props.item"  >{{uid}}</td>
    <td >
    <div v-for="(value, key, index) in props.item" >
    	
    {{ --items.length }}
    	
    </div>
    
    </td>      
  
  <td v-for="(valuex, key, index) in props.item"  >
 
  	<v-card v-for="(item, key, index) in valuex" :key="item.id">
  		
  	{{item.id}} <v-divider ></v-divider>
  	</v-card>
  
  </td>
  
 	  <td v-for="(value, key, index) in props.item"  >
  	  <app-ordens-item   v-for="(value, key, index) in value" :cartItem="value" :key="value.key"></app-ordens-item>
  	  </td>

  	 


  	



          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
	
	import OrdensItem from './OrdensItem';
export default {
	components:{
		appOrdensItem: OrdensItem
	},
  data () {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: 'uid'
        },
        { text: 'User', value: 'id' },
        { text: 'QTDProduc', value: 'progress' },
        { text: 'Description', value: 'description' },
        { text: 'Status2', value: 'status2' },
        { text: 'Status3', value: 'status3' },
      ],
     // items: {},
		indexA:0,
      colors: {
        processing: 'blue',
        sent: 'red',
        delivered: 'green'
      }
    };
  },
  computed: {
	   ...mapGetters(['transactionsItemList']),
    randomColor () {
      let item = Math.floor(Math.random() * this.colors.length);
      return this.colors[item];
    },
	items(){
		return  this.transactionsItemList;
	},
	totalValue() {
				let res = [];
		let tt ;
				this.transactionsItemList.map(item => {
					res.push(item);
				});
		console.log(res);
				
				return res;
			}
  },
  methods: {
	  ...mapActions(['listenToTransactionsList']),
    getColorByStatus (status) {
      return this.colors[status];
    },
  },
	  created(){
		  this.listenToTransactionsList();
		  //this.items = this.transactionsItemList
	  }
};
</script>

<!-- 
  <td v-for="(item, index) in props.item"  >{{ item.length}}</td>
  <td v-for="(value, key, index) in props.item"  >{{ value }}</td>
  <td v-for="(value, key, indexx) in props.item"  >{{indexx }}</td>-->