<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	page{
		background: transparent  url(static/bj.png) no-repeat;
		background-size: 100% 100%;
	}
	.container {
	    background-color: rgba(255, 255, 255, 0.2);	
	}
</style>
