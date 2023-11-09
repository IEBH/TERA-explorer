<script>
import {cloneDeep} from 'lodash-es';
import JsonEditor from 'json-editor-vue';

export default {
	components: {
		JsonEditor,
	},
	inject: ['fileComponent'],
	props: {
		/**
		* File object to view
		* @type {File}
		*/
		file: {type: Object, required: true},
	},
	computed: {
		/**
		* Deep copy of the input `file` prop as json-editor needs to bind against it with v-model and Vue normally forbids having properties writable
		* @returns {Object} A deep copy of the input `file` prop
		*/
		fileMeta() {
			return cloneDeep(this.file);
		},
	},
}
</script>

<template>
	<div class="card h-100 border-0 rounded-0">
		<div class="card-header d-flex-center justify-content-between">
			<span>
				<i :class="file.icon" class="me-1"/>
				{{file.name}}
			</span>
			<a @click="fileComponent.selectFile(null)" class="btn btn-light">
				<i class="fas fa-arrow-circle-up"/>
				Back to file list
			</a>
		</div>
		<div class="card-body p-0">
			<json-editor
				v-model="fileMeta"
				mode="text"
				class="h-100"
				readOnly
			/>
		</div>
	</div>
</template>
