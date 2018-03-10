(function(){
	var priceMatch={
		init: function(){
			this.getOrderList();
		},
		getOrderList: function(cb){
			// 从订单前30条中过滤有效订单
			var me=this;
			console.log('priceMatch start....');
			$.ajax({
				url: 'xxx',
				dataType: 'jsonp',
				data: {
					sceneval:2,
					callersource:'mainorder',
					order_type:6,
					callback:'allPayA',
					bid: '',
					start_page:1,
					page_size:30,
					last_page:0,
					isoldpin:0,
					utfswitch:1
				},
				success: function(data){
					console.log(data);
					if(data && data.deal_list && data.deal_list.length>0){
						// 获取到订单信息
						var result=me.filter(data.deal_list);
						var skuIds=me.getSkuIds(result);
						console.log(result,skuIds);
					}
				}
			})
		},
		getSkuIds: function(validOrderList){
			if(!validOrderList || validOrderList.length==0){
				return
			}
			var skuIds=[];
			$.map(validOrderList,function(item){
				try{
					var tradeList=item.trade_list;
					// console.log(item)
					$.map(tradeList,function(trade){
						skuIds.push(trade.item_skuid);
					});
				}catch(e){
					console.log(e);
				}
			});
			return skuIds;
		},
		filter: function(orderList){
			var me=this;
			if($ && $.map){
				var validOrderList=[];
				try{
					validOrderList=$.map(orderList,function(item,i){
						// 过滤自营订单 & 过滤30天内的订单
						var seller_id=item.seller_id;
						var dateSubmit=item.dateSubmit;
						if(seller_id=="0" && me.isBeforeDay30(dateSubmit)){
							return item
						}

					});
				}catch(e){
					console.log(e);
				}

				return validOrderList;
			}
		},
		isBeforeDay30: function(dateSubmit){
			var now=new Date();
			var lw = new Date(now - 1000 * 60 * 60 * 24 * 30);
			var lastY = lw.getFullYear();
			var lastM = lw.getMonth()+1;
			var lastD = lw.getDate();
			var beforeDay30=lastY+(lastM<10 ? "0" + lastM : lastM)+(lastD<10 ? "0"+ lastD : lastD);
			dateSubmit=dateSubmit.substring(0,10).replace(/-/g,'');
			return parseInt(beforeDay30,10)<=parseInt(dateSubmit,10)
		},
		getPayPrice: function(orderIds){
			// 获取实际支付价格
		},
		getJdPrice: function(productIds){
			// 获取JD实时价格
		},
		comparePrice: function(payPrice,JdPrice){
			// 比价
		},
		getResultList: function(){
			// 获取满足价保条件的商品列表
		}
	}

	priceMatch.init();
})();
