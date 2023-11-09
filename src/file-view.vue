<script>
import {cloneDeep} from 'lodash-es';
import JsonEditor from 'json-editor-vue';

export default {
	components: {
		JsonEditor,
	},
	inject: ['fileComponent'],
	data() { return {
		/**
		* References for the given file if it has them
		* @type {Array<RefLibRef>}
		*/
		references: null,
	}},
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
	methods: {
		/**
		* Fetch the refs for the active file if we don't already have them
		*/
		fetchRefs() {
			return this.$tera.getProjectLibrary(this.file.path)
				.then(references => this.references = references)
		},
	},
}
</script>

<template>
	<div class="card h-100 border-0 rounded-0">
		<div class="card-header d-flex-center justify-content-start p-1">
			<a @click="fileComponent.selectFile(null)" v-tooltip="'Return to project file list'" class="btn btn-light me-1">
				<i class="fas fa-arrow-circle-up"/>
			</a>
			<span>
				<i :class="file.icon" class="me-1"/>
				{{file.name}}
			</span>

			<ul v-if="file.meta.reflib" class="nav nav-tabs pe-2 flex-grow-1 justify-content-end">
				<li class="nav-item">
					<a class="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-file-meta">Meta</a>
				</li>
				<li class="nav-item">
					<a @click="fetchRefs" class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-file-refs">Refs</a>
				</li>
			</ul>
		</div>
		<div class="card-body p-0 overflow-auto">
			<div class="tab-content h-100">
				<div id="nav-file-meta" class="tab-pane fade show active h-100" role="tabpanel">
					<json-editor
						v-model="fileMeta"
						mode="text"
						class="h-100"
						readOnly
					/>
				</div>
				<div id="nav-file-refs" class="tab-pane fade h-100" role="tabpanel">
					<json-editor
						v-if="references"
						v-model="references"
						mode="text"
						class="h-100"
						readOnly
					/>
				</div>
			</div>
		</div>
	</div>
</template>
