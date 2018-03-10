if(typeof $ORDER_CONFIG !== "undefined"){
	// 从全局变量中获取接口查询条件
	var priceMatch={
		config: {
			orderWareIds: $ORDER_CONFIG.orderWareIds,
			orderWareTypes: $ORDER_CONFIG.orderWareTypes,
			orderIds: $ORDER_CONFIG.orderIds,
			orderTypes: $ORDER_CONFIG.orderTypes,
			orderSiteIds: $ORDER_CONFIG.orderSiteIds
		},
		getOrderProductInfo: function(cb){
			// 获取用户第一页订单的商品信息
			var me=this;
			$.ajax({
				url: '//order.jd.com/lazy/getOrderProductInfo.action',
				data: me.config,
				success: function(data){
					cb && cb(data);
				}
			});
		},
		filter: function(){
			// 过滤30天内的订单
		},
		getPayPrice: function(){
			// 获取实际支付价格
		},
		getJdPrice: function(){
			// 获取JD实时价格
		}
	}

	// priceMatch.getOrderProductInfo(function(data){
	// 	// console.log(data)
	// })
}
