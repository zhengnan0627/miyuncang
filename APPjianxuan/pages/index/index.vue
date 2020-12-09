<template>
	<view class="container">
		<view class="title">
			<text>仓储管理系统-移动端</text>
			<text>V1.0</text>
		</view>
		<view class="userinfo">
			<view class="">
				操作员:{{userinfo.name}}
			</view>
			<view class="time">
				{{time}}
			</view>
		</view>
		<view class="zuoye">
			<text>选择作业类型</text>
		</view>
		<view class="zuoyenum">
			<view class="zuoyenum-item"  @click="toshangjia">
				<view class="">
					101
				</view>
				<view class="">
					入库任务数
				</view>
			</view>
			<view class="zuoyenum-item"  @click="torenwu">
				<view class="">
					90
				</view>
				<view class="">
					盘点任务数
				</view>
			</view>
		</view>
		<view class="top">
			<view class=""style="font-size: 22px; text-decoration: underline;">
				今日作业排行
			</view>
			<view class="">
				<u-tabs 
				:list="list" :is-scroll="false" :current="current" height="60" item-width="80"
				active-color="#00ff7f" bg-color="#eeeeee" :show-bar="false"
				:active-item-style="{backgroundColor:'#00ff7f',color:'#ffffff'}"
				@change="change"></u-tabs>
			</view>
		</view>
		<view class="topchart">
			<view class="topchart-container">
				<view class="chart-title">
					入库数量排行
				</view>
				<view class="qiun-columns">
						<view class="qiun-charts">
							<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"> <!-- @touchstart="touchColumn" --></canvas>
						</view>
				</view> 
			</view>
		</view>
		<view class="footer">
			<view class="footer-title">
				<text>广州时空智友科技有限公司</text>
				<text>版权所有</text>
			</view>
			<view class="footer-ser">
				<text>Copyright @ 2020 All Rights Reserved</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../components/u-charts/u-charts.js';
	var _self;
	var canvaColumn=null;
	export default {
		data() {
			return {
				userinfo:{
					name:'张三'
				},
				time:'2020-10-29 14:43:30',
				keepinterval:null,
				list: [
					{name: '入库'},
					{name: '盘点'}
				],
				current: 0,
				//u-chart相关数据
				cWidth:'',//树状图宽度数据
				cHeight:'',//树状图高度数据
				pixelRatio:1,
				chartData: {
				  "categories": ['罗的霄','王的杰','张的磊','房的时','章的磊','李的刚','刘的红','张乐乐','刘的红','张乐乐'],
				  "series": [
					  {
					// "color":"#0081d4",
					// "textColor":"#ffffff",
					// "name": "拣货排行榜",
						"data": [355,344,300,270,250,240,210,190,166,128],
					// "color": "red"
					},
				  ]
				},	
			}
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(730);
			this.cHeight=uni.upx2px(500);
			_self.showColumn("canvasColumn",this.chartData);
			// this.interval()
		},
		methods: {
			//页面定时器方法
			interval(){
				if (this.keepinterval) {
					clearInterval(this.keepinterval)
					console.log('清除数字时钟');
				}
				this.keepinterval = setInterval(()=>{
					console.log(this.keepinterval);
					let datetime = new Date();
					let year = datetime.getFullYear();
					let month = datetime.getMonth()+1;//js从0开始取 
					let date = datetime.getDate(); 
					let hour = datetime.getHours(); 
					let minutes = datetime.getMinutes(); 
					let second = datetime.getSeconds();
					if(month<10){
					month = "0" + month;
					}
					if(date<10){
					date = "0" + date;
					}
					if(hour <10){
					hour = "0" + hour;
					}
					if(minutes <10){
					minutes = "0" + minutes;
					}
					if(second <10){
					second = "0" + second ;
					}
					this.time = year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;
				},1000)
			},
			change(index) {
				this.current = index;
			},
			//跳转到上架药品列表
			toshangjia(){
				uni.navigateTo({
					url:'sjyaopin'
				})
			},
			//跳转到上架药品列表
			torenwu(){
				uni.navigateTo({
					url:'pdrenwu'
				})
			},
			//树状图调用方法
			showColumn(canvasId,chartData){
				// console.log("aaa")
				canvaColumn =new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					legend:{
						show:false,
						fontColor:"#ffffff",
						},
					fontSize:13,
					colors:['#ffffff',],
					background:'#0076b1',
					padding:[10,10,15,7],
					pixelRatio:_self.pixelRatio,
					animation: false,
					categories: chartData.categories,
					series: chartData.series,
					// enableScroll: true,//开启图表拖拽功能
					xAxis: {
						rotateLabel:true,
						disableGrid:true,
						gridColor:'#cccccc',
						fontColor:'#ffffff',
						axisLineColor:'#cccccc',
						// type:'grid',
						// 	gridType:'dash',
						// 	itemCount:5,//x轴单屏显示数据的数量，默认为5个
						// 	scrollShow:true,//新增是否显示滚动条，默认false
						// 	scrollAlign:'left',//滚动条初始位置
						// 	scrollBackgroundColor:'#F7F7FF',//默认为 #EFEBEF
						// 	scrollColor:'#DEE7F7',//默认为 #A6A6A6
					},
					yAxis: {
						"disableGrid":true,
						//disabled:true,
						// gridColor:"#cccccc",
						data:[{
							
							// "axisLine":false,
							// min:100,
							"titleFontColor":"#ffffff",
							"fontColor":"#ffffff",
							"axisLineColor":'#dadada',
						}]			
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width:chartData.categories.length > 4 ? _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length : 45
						}
					  }
				});
			},
		}
	}
</script>

<style lang="scss" scoped> 
	.container {
		height: 100vh;
		color: #FFFFFF;
		font-size: 18px;
	}
	.title{
		width: 100%;
		height: 150rpx;
		line-height: 150rpx;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		color: #FFFFFF;
	}
	.userinfo{
		box-sizing: border-box;
		padding: 5px 10px;
		display: flex;
		justify-content: space-between;
	}
	.zuoye{
		box-sizing: border-box;
		padding: 5px 10px;
		font-size: 44rpx;
		text-decoration: underline;
	}
	.zuoyenum{
		box-sizing: border-box;
		padding: 5px 10px;
		display: flex;
		justify-content: space-between;
		.zuoyenum-item{
			flex: 1;
			text-align: center;
			font-size: 28px;
			font-weight: 500;
			border-radius: 5px;
			background-color: rgba($color: #ffffff, $alpha: 0.5);
		}
		.zuoyenum-item view{
			padding: 7px 0;
		}
		
	}
	.zuoyenum-item:first-child{
		margin-right: 10rpx;
	}
	.zuoyenum-item view:last-child{
		font-size: 24px;
		color: #005bbc;
	}
	.top{
		box-sizing: border-box;
		padding: 10px 10px;
		display: flex;
		justify-content: space-between;
	}
	.topchart{
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		width: 100vw;
		height: 580rpx;
		
		.chart-title{
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
		}
	}
	.topchart-container{
		width: 100%;
		height: 100%;
		border-radius: 2px;
		background-color: rgba($color: #ffffff, $alpha: 0.5);
	}
	.qiun-charts {
		width: 730rpx;
		height: 500rpx;
	}
	.charts {
		width: 730rpx;
		height: 500rpx;
	}
	.footer{
		box-sizing: border-box;
		margin-top: 50rpx;
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #FFFFFF !important; 
	}
</style>
