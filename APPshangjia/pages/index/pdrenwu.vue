<template>
	<view class="container">
		<u-navbar  title="盘点任务列表" :background="{background: 'rgb(83 201 234)'}" back-icon-color="#ffffff" title-color="#ffffff" :isFixed="true" :border-bottom="false"></u-navbar>
		<view class="fixed">
			<uni-icons type="plusempty" :size="20" color="#ffffff"></uni-icons>
			<text>临时盘点</text>
		</view>
		<template v-for="(item,index) in renwuList">
			<view class="renwubox">
				<view class="renwu-item" style="flex: 1;font-size: 42rpx;">
					通道{{item.id}}
				</view>
				<view class="renwu-item" style="flex: 1;">
					未盘:&nbsp&nbsp{{item.wpnum}}
				</view>
				<view class="renwu-item" style="flex: 1;">
					已盘:&nbsp&nbsp{{item.ypnum}}
				</view>
				<view class="renwu-item" @click="Torenwudetail(item,index)">
					<uni-icons type="arrowright" color="#FFFFFF"></uni-icons>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				renwuList:[
					{id:'101',wpnum:'100',ypnum:'20'},
					{id:'102',wpnum:'102',ypnum:'20'},
					{id:'103',wpnum:'120',ypnum:'20'},
					{id:'104',wpnum:'140',ypnum:'20'},
					{id:'105',wpnum:'130',ypnum:'20'},
					{id:'101',wpnum:'100',ypnum:'20'},
					{id:'102',wpnum:'102',ypnum:'20'},
					{id:'103',wpnum:'120',ypnum:'20'},
					{id:'104',wpnum:'140',ypnum:'20'},
					{id:'105',wpnum:'130',ypnum:'20'},
					{id:'101',wpnum:'100',ypnum:'20'},
					{id:'102',wpnum:'102',ypnum:'20'},
					{id:'103',wpnum:'120',ypnum:'20'},
					{id:'104',wpnum:'140',ypnum:'20'},
					{id:'105',wpnum:'130',ypnum:'20'},
					{id:'101',wpnum:'100',ypnum:'20'},
					{id:'102',wpnum:'102',ypnum:'20'},
					{id:'103',wpnum:'120',ypnum:'20'},
					{id:'104',wpnum:'140',ypnum:'20'},
					{id:'105',wpnum:'130',ypnum:'20'},
					{id:'101',wpnum:'100',ypnum:'20'},
					{id:'102',wpnum:'102',ypnum:'20'},
					{id:'103',wpnum:'120',ypnum:'20'},
					{id:'104',wpnum:'140',ypnum:'20'},
					{id:'105',wpnum:'130',ypnum:'20'},
				]
			}
		},
		methods: {
			Torenwudetail(item,index){
				uni.navigateTo({
					url:'tdrenwu'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		width: 100vw;
		// height: 100vh;
		color: #FFFFFF;
	}
	/deep/ .uni-searchbar{
		background-color: transparent !important;
	}
	.fixed{
		position: fixed;
		bottom: 100rpx;
		right: 2rpx;
		display: flex;
		align-items: center;
		padding-left: 10px;
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		border-radius: 50px 0 0 50px;
		background-color: #ff5500;
	}
	.renwubox{
		box-sizing: border-box;
		margin: 10px 2vw;
		padding: 8px 5px;
		width: 96vw;
		display: flex;
		justify-content: space-between;
		text-align: center;
		align-items: center;
		font-size: 36rpx;
		color: #000000;
		background-color: rgba($color: #FFFFFF, $alpha: .4);
	}
	.renwubox:last-child{
		margin-bottom: 0;
	}
</style>
