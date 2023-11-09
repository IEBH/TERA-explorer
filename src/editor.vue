<script>
import JsonEditor from 'json-editor-vue';

export default {
	components: {
		JsonEditor,
	},
}
</script>

<template>
	<json-editor
		v-model="$tera.state"
		mode="text"
		class="h-100"
	/>
</template>
