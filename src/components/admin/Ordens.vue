<template>
  <v-card>
   <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
   
         
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          hide-actions
          class="elevation-0 table-striped"
        >
          <template  slot="items" slot-scope="props">

 
  <td v-for="(item, uid, i, data) in props.item"  >{{uid}}</td>
  
    <td >
    <div v-for="(value, key, index) in props.item" >
    	
    {{ --items.length + 1}}
    	
    </div>
    
    </td>      

 

  	 <td v-for="(values, key, index) in props.item"  >
 	    <v-expansion-panel>
    <v-expansion-panel-content
    
    >
      <div slot="header">Total</div>
  	  <app-ordens-item   v-for="(value, key, index) in values" :cartItem="value" :key="value.key" ></app-ordens-item>
  	<tr>
        <td class="text-center" v-for="(value, key, index) in props.item" :key="value.key" > Total: ${{totalValue(value)}} </td>
        
      </tr>
       
         </v-expansion-panel-content>
  </v-expansion-panel> 
           </td>
 	 
         


          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
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
        
      
      
     
        { text: 'total1', value: 'values' },
        { text: 'total2', value: 'values' },
        { text: 'total3', value: 'values' },
        
       
      ],
		valuesx:'',
		valuesxx:'',
     search:'',
		indexA:0,
      
    };
  },
  computed: {
	   ...mapGetters(['transactionsItemList']),
    
	items(){
		return  this.transactionsItemList;
	},
	oi(){
		
		for(var usres of this.transactionsItemList ){
			
		}
			console.log(usres);
		
		
		
		let xxxx =(this.valuesx);
		//console.log(xxxx);
	return xxxx;
},
	totalValuex(value) {
				let res = 0;
				value.map(item => {
					res += item.price * item.quantity;
				});
				return res;
			}
	
				
		
  },
  methods: {
	  ...mapActions(['listenToTransactionsList']),
   
			totalValue(val) {
				let res = 0;
					val.map(item => {
					res += item.price * item.quantity;
				});
		
		
		
	//console.log(res);
			return this.valuesxx= res;
		//return res;
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