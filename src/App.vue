<script>
import Editor from './editor.vue';

export default {
	components: {
		Editor,
	},
}
</script>

<template>
	<div>
		<Editor/>
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
}
</style>
