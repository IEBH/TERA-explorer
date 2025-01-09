<script>
import JsonEditor from 'json-editor-vue';

export default {
	components: {
		JsonEditor,
	},
	data() { return {
		/**
		* The current user state
		* @type {Array<File>}
		*/
		user: [],
	}},
	methods: {
		/**
		* Refresh the current user state
		*/
		refresh() {
			return this.$tera.getUser()
				.then(res => this.user = res)
		},
	},
	created() {
		return this.refresh();
	},
}
</script>

<template>
	<div class="editor h-100">
		<json-editor
			v-model="user"
			mode="text"
			class="h-100"
			read-only
		/>
	</div>
</template>
