<template>
<div  :class="{loadingItem: isProductLoading}">
  <div class="row text-center" v-if="isProductLoading">
    <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize"></grid-loader>
  </div>
  <div v-else class="row action-panel">
    <div class="col-xs-12">
      <div class="btn-group pull-right">
				<a id="list" class="btn btn-default btn-sm" @click.prevent="changeDisplay(true)">
					<span class="glyphicon glyphicon-th-list"></span>List
				</a>
				<a id="grid" class="btn btn-default btn-sm" @click.prevent="changeDisplay(false)">
					<span class="glyphicon glyphicon-th"></span>Grid
				</a>
      </div>
    </div>
  </div>

  <v-container id="appcont" fluid grid-list-md v-if="!isProductLoading">

	

  
  		
   	
    <app-product-item  v-for="prod in products" :item="prod" :key="prod.id" :displayList="displayList"></app-product-item>
   
  


	</v-container>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductItem from './product/ProductItem.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';

export default {
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "100px",
      displayList: false
    }
  },
  computed: {
    ...mapGetters(['products', 'isProductLoading']),
  },
  components: {
    appProductItem: ProductItem,
    GridLoader
  },
  methods: {
    changeDisplay(isList) {
      this.displayList = isList;
    }
  }
}
</script>

<style scoped="true" lang="scss">
.is-flex {
  display: flex;
  flex-wrap: wrap;
}

	#appcont{
	display: inline;
		/*grid-row: auto;*/
		position: absolute;
		align-content: center;
  justify-content: center;
	float:right;
		left: 2vw;
		right:2vw;
		width: 100vw;
	
		
	}
	
.loadingItem {
  align-items: center;
  justify-content: center;
  display: flex;
}

.is-flex>[class*='col-'] {
  display: flex;
  flex-direction: column;
}

.action-panel {
	position: relative;
  margin-top: 5vh;
  margin-right: 5px;
}
</style>
