if(typeof $ORDER_CONFIG !== "undefined"){	
	var priceMatch={
		config: {
			orderWareIds: $ORDER_CONFIG.orderWareIds,
			orderWareTypes: $ORDER_CONFIG.orderWareTypes,
			orderIds: $ORDER_CONFIG.orderIds,
			orderTypes: $ORDER_CONFIG.orderTypes,
			orderSiteIds: $ORDER_CONFIG.orderSiteIds
		},
		getOrderProductInfo: function(cb){
			// Get Product List;
			var me=this;
			$.ajax({
				url: '//order.jd.com/lazy/getOrderProductInfo.action',
				data: me.config,
				success: function(data){
					cb && cb(data);
				}
			})
		},
		getOrderProductPrice: function(){
		}
	}

	// priceMatch.getOrderProductInfo(function(data){
	// 	// console.log(data)
	// })
}


