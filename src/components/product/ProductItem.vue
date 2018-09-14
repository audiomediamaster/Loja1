<template>


<div  class="pi " :class="{'list-group-item': displayList}">
            <v-flex >
               <v-hover>
              <v-card id="poc" width="10vw" class="back--text grey lighten-3 my-1 mx-1"  slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`">
               	
                <v-layout>
                  <v-flex >
                    <v-img
                      :src="item.thumbnail_url"
                      height="10vh"
                      	:aspect-ratio="1.4"
                      position = "1em"
                      contain
                      	alt="" 
                      	class="grow thumbnail-image"
                      		transition="slide-x-transition"
                      	
                    ></v-img>
            
                    <h4 class="ml-3">${{ item.price }}</h4>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title class="pull-right">
                      <div>
                        <router-link :to="'/product/' + item.id" tag="h4"><a>{{ item.title }}</a></router-link>
                        <p class="truncate caption">{{ item.description | shortDescription}}</p>
                        
                        
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              
                <v-card-actions class="pa-3">
                    <v-btn  class=" green btp" :disabled="item.quantity === 0" @click="addItem">
                        Add to cart
                    </v-btn>
                  <v-spacer></v-spacer>
                  <v-flex sx6>
                  	
                  <span class="stock pull-right">{{ item.quantity }} left in stock</span>
                  <v-divider ></v-divider>
                  <v-icon class="pull-right">star_border</v-icon>
               
                  </v-flex>
                </v-card-actions>
              </v-card>
               </v-hover>
            </v-flex>
</div>
	





</template>

<script>
import {
  mapActions,
	 mapGetters
} from 'vuex';
export default {
  props: ['item', 'displayList'],
	computed: { ...mapGetters([ 'isLoggedIn', 'currentUser']),
			  },
			   
  methods: {
    ...mapActions(['updateCart']),
    addItem() {

	  
      const order = {
        item: Object.assign({}, this.item),
        quantity: 1,
        isAdd: true,

      };
      this.updateCart(order);
    }
  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 50) {
        return value.substring(0, 50) + '...';
      } else {
        return value;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pi {
	position: relative;
	margin: 0.3vw;
 float: left;
	width: auto;
	
	
}
	#poc{
		position: relative;
		min-width: 20em;
		padding: 0;
	}
.favourite-icon {
  font-size: 10px;
}

.stock {
	margin: 1px;

  color: #d17581;
	 float: left;
}
.is-flexx {

  margin:auto;
  display:block;
}
.grow {

  transition: all .2s ease-in-out;
}

.thumbnail:hover .grow {
	
  transform: scale(1.1);
}

	.truncate .caption{
		display: block;
		
	}
	
	
.list-group-item {
 padding: 1%;
    float: left;
     width: 80%;
	height: auto;
	
	#poc {
		
	 width: 100% !important;	
	}

}

.grow .thumbnail-image {
	width: 15vw;
	height: auto !important;

}



</style>
