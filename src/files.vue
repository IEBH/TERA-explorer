<script>
import FileView from './file-view.vue';

export default {
	components: {
		FileView,
	},
	provide() { return {
		fileComponent: this,
	}},
	data() { return {
		/**
		* Collection of files fetched from the server
		* @type {Array<File>}
		*/
		files: [],


		/**
		* The currently selected file (if any)
		* @type {File}
		*/
		file: null,
	}},
	methods: {
		/**
		* Refresh the list of files within a project
		*/
		refresh() {
			return this.$tera.getProjectFiles()
				.then(files => this.files = files)
		},


		/**
		* Select a file and open the <file-view/> component with that as a prop
		*/
		selectFile(file) {
			this.file = file;
		},


		/**
		* Fetch citation library as JSON and copy to clipboard
		*/
		async copyLibrary(file) {
			let refs = await file.getRefs();
			await navigator.clipboard.writeText(JSON.stringify(refs, null, '\t'));
		},


		/**
		* Format an input string into a human readable format using the Intl.NumberFormat utility
		*
		* @param {Number} size The size to format
		* @returns {String} A human readable file-size string
		*/
		formatFileSize: new Intl.NumberFormat([], {
			style: 'unit',
			unit: 'byte',
			notation: 'compact',
			unitDisplay: 'narrow',
		}).format,


		/**
		* Format a ISO date string into a human readable locale format
		*
		* @param {String} isoString The ISO date string to format
		* @returns {String} A human readable date string
		*/
		formatDate(isoString) {
			return (new Date(isoString)).toLocaleString();
		},
	},
	created() {
		return this.refresh();
	},
}
</script>

<template>
	<div class="h-100">
		<div v-if="files.length == 0" class="d-flex-center p-4">
			<div class="text-muted">The selected project has no files</div>
		</div>
		<div v-else-if="file" class="h-100">
			<file-view :file="file"/>
		</div>
		<table v-else class="table table-hover w-100">
			<thead>
				<tr>
					<th colspan="2" class="text-start">File</th>
					<th class="text-end">Size</th>
					<th class="text-center">Last modified</th>
					<th class="text-start">Metadata</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="file in files" :key="file.name" class="clickable">
					<td @click="selectFile(file)" class="text-center">
						<i
							v-tooltip="{
								placement: 'left',
								content: file.type,
							}"
							class="fa-lg"
							:class="file.icon"
						/>
					</td>
					<td @click="selectFile(file)" class="text-start">
						{{file.name}}
					</td>
					<td @click="selectFile(file)" class="text-end">
						<span v-tooltip="`${file.size} bytes`">
							{{formatFileSize(file.size)}}
						</span>
					</td>
					<td @click="selectFile(file)" class="text-center">
						<span v-tooltip="file.modified">
							{{formatDate(file.modified)}}
						</span>
					</td>
					<td @click="selectFile(file)" class="text-center">
						<span v-if="file.meta.reflib" class="badge bg-primary">
							{{file.meta.reflib.refCount}} refs
						</span>
					</td>
					<td>
						<!-- File dropdown menu {{{ -->
						<div class="dropdown">
							<button
								:id="`fileVerbs-${file.name}`"
								class="btn btn-ellipsis"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							/>
							<div class="dropdown-menu" aria-labelledby="`fileVerbs-${file.name}`">
								<a @click="selectFile(file)" class="dropdown-item">
									<i class="fas fa-fw fa-file"/>
									View file data
								</a>
								<a v-if="file.meta.reflib" @click="copyLibrary(file)" class="dropdown-item">
									<i class="fas fa-fw fa-copy"/>
									Copy refs as JSON
								</a>
								<a @click="download(file)" class="dropdown-item">
									<i class="fas fa-fw fa-download"/>
									Download
								</a>
								<div class="dropdown-divider"/>
								<a @click="remove(file)" class="dropdown-item dropdown-item-danger">
									<i class="fas fa-fw fa-trash"/>
									Delete
								</a>
							</div>
						</div>
						<!-- }}} -->
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
