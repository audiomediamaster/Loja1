<template>


<v-container class="floatL" :class="{'list-group-item': displayList}">
            <v-flex xs12 sm6 md6>
              <v-card  class="white--black ">
                <v-layout>
                  <v-flex xs5>
                    <v-card-media
                      :src="item.thumbnail_url"
                      height="125px"
                      contain
                      	alt="" 
                      	class="grow thumbnail-image"
                    ></v-card-media>
                <v-divider dark></v-divider>
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
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                    <button class="btn btn-success btp" :disabled="item.quantity === 0" @click="addItem">
                        Add to cart
                    </button>
                  <v-spacer></v-spacer>
                  <span class="stock">{{ item.quantity }} left in stock</span>
                  <v-spacer></v-spacer>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                </v-card-actions>
              </v-card>
            </v-flex>
</v-container>
	





</template>

<script>
import {
  mapActions
} from 'vuex';
export default {
  props: ['item', 'displayList'],
  methods: {
    ...mapActions(['updateCart']),
    addItem() {
      const order = {
        item: Object.assign({}, this.item),
        quantity: 1,
        isAdd: true
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

<style scoped>
.thumbnail {
 
	/*width: 30vw;*/
	/*height: 30vw;*/
	
}
	.floatL{
		float: left;
		/*width: 50vw;*/
		
	}
.favourite-icon {
  font-size: 10px;
}

.stock {
	margin: 0;
  padding-right: 10px;
  padding-left: 10px;
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

.item.list-group-item {
  border: none;
	border-radius: 5px;
  float: left;
/*  width: 100%;
	height: auto;*/
  background-color: #fff;
  margin-bottom: 10px;
}

.grow .thumbnail-image {
	width: 15vw;
	height: auto !important;
  padding: 15px;
}

.list-group-item .thumbnail-image {
  margin-right: 10px;
  max-height: 150px;
}

.item.list-group-item .thumbnail {
  margin-bottom: 0px;

}

.item.list-group-item img {
  float: left;
}

.item.list-group-item:after {
  clear: both;
}
</style>
