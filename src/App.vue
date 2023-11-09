<script>
import Frame from './frame.vue';

export default {
	components: {
		Frame,
	},
}
</script>

<template>
	<div>
		<Frame/>
	</div>
</template>

<style lang="scss">
#app {
	height: 100vh;
	display: flex;
	align-items: start;
	overflow: hidden;
	padding: 30px;

	& > div {
		width: 100%;
		height: 100%;
	}

	&::after {
		pointer-events: none;
		content: '';
		background-position: center right;
		background-image: url('https://tera-tools.com/assets/logo/logo.svg');
		background-repeat: no-repeat;
		background-size: contain;
		position: fixed;
		right: 20px;
		bottom: 20px;
		width: 50%;
		height: 50%;
		opacity: 0.1;
	}
}
</style>
