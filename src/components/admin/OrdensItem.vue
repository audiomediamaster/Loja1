<template>
<div>
	
	<tr>
		<td data-th="Product">
			<div class="row">
				<div class="col-sm-2 hidden-xs">
					<img :src="cartItem.thumbnail_url" alt="..." class="img-responsive" />
				</div>
				<div class="col-sm-10">
					<h4 class="nomargin">{{ cartItem.title }}</h4>
					<!--<p>{{ cartItem.description }}</p>-->
				</div>
			</div>
		</td>
		<td data-th="Price">{{ cartItem.price }}</td>
		<td data-th="Quantity">
			<input type="number" class="form-control text-center" :value="cartItem.quantity" @input="updateQuantity" min="0">
		</td>
		<td data-th="Subtotal" class="text-center">${{ subtotal }}</td>
		
		
	</tr>
</div>
</template>

<script>
	import {
		mapActions,
		  mapGetters
	} from 'vuex';
	export default {
		props: ['cartItem'],
		computed: {
			 ...mapGetters(['transactionsItemList']),
			subtotal() {
				return this.cartItem.quantity * this.cartItem.price;
			},
				
    
			// itemQuantity: {
			// 	get() {
			// 		return 
			// 	}
			// }
		},
		methods: {
			...mapActions(['updateCart', 'removeItemInCart']),
			removeItem() {
				let vm = this;
				this.removeItemInCart({
					item: vm.cartItem
				});
			},
			updateQuantity(event) {
				let vm = this;
				this.updateCart({
					item: vm.cartItem,
					quantity: parseInt(event.target.value),
					isAdd: false
				});
			}
		}
	}

</script>
