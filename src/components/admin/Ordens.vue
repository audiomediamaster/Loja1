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
          <template v-for="item in items" slot="items" slot-scope="props">
            <td >  aaa{{
            }} </td>

  <td v-for="(item, index, i, data) in props.item"  >{{index}}</td>
  <td v-for="(item, index) in props.item"  >{{ item.length}}</td>
  <td v-for="(value, key, index) in props.item"  >{{ value }}</td>
  <td v-for="(value, key, indexx) in props.item"  >{{indexx }}</td>
  <td v-for="(value, key, index) in item"  >x{{value[0] }}</td>

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
export default {
  data () {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: '0'
        },
        { text: 'User', value: 'deadline' },
        { text: 'QTDProduc', value: 'progress' },
        { text: 'Description', value: 'status' },
        { text: 'Status2', value: 'status' },
        { text: 'Status3', value: 'status' },
      ],
     // items: {},
		indexA:2,
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
	ecal(){
		
		return 0;
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
