<v-container class="d-flex">
            <v-flex xs12 sm6>
              <v-card color="cyan darken-2" class="white--text">
                <v-layout>
                  <v-flex xs5>
                    <v-img
                      :src="item.thumbnail_url"
                      height="125px"
                      contain
                      	alt="" 
                      	class="grow thumbnail-image"
                    ></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <router-link :to="'/product/' + item.id" tag="h4"><a>{{ item.title }}</a></router-link>
                        <p class="truncate caption">{{ item.description | shortDescription}}</p>
                        <h4 class="pull-right">${{ item.price }}</h4>
                        <span class="stock">{{ item.quantity }} left in stock</span>
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
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                </v-card-actions>
              </v-card>
            </v-flex>
</v-container>
  