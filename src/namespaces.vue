<script>
import BtnPromise from '@momsfriendlydevco/vitel/components/btn-promise';
import JsonEditor from 'json-editor-vue';

export default {
	components: {
		BtnPromise,
		JsonEditor,
	},
	data() { return {
		/**
		* The list of available namespaces
		* @type {Array<Object>}
		*/
		namespaces: [],

		/**
		* The selected namespace object
		* @type {Object<Object>} An entry within `namespaces`
		*/
		nsActive: null,

		/**
		* The current namespace contents as a JSON stringified string
		* @type {String}
		*/
		nsContent: null,
	}},
	methods: {
		/**
		* Refresh the current user state
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		refresh() {
			return this.$tera.listNamespaces()
				.then(res => {
					this.namespaces = res;
					this.nsActive = this.namespaces.find(ns => !this.nsActive || ns.name == this.nsActive);
				})
		},
	},
	created() {
		return this.refresh();
	},
	watch: {
		nsActive() {
			if (!this.nsActive.name) return;

			this.$tera.getNamespace(this.nsActive.name)
				.then(content => this.nsContent = JSON.stringify(content, null, '\t'))
		},
	},
}
</script>

<template>
	<div class="h-100">
		<div class="card-header">
			<div class="btn-group">
				Namespace:
				<a class="btn btn-light dropdown-toggle text-start" data-bs-toggle="dropdown" style="min-width: 250px">
					{{nsActive?.name || 'Select namespace...'}}
				</a>
				<ul class="dropdown-menu">
					<a
						v-for="ns in namespaces"
						:key="ns.name"
						class="dropdown-item"
						@click="nsActive = ns"
					>
						{{ns.name}}
					</a>
					<div v-if="namespaces.length == 0" class="dropdown-item disabled">No namespaces</div>
				</ul>
				<btn-promise
					:action="()=> refresh()"
					idle-icon="fas fa-sync m-0"
					idle-class="btn btn-light me-2"
					active-icon="fas fa-sync fa-spin m-0"
					active-class="btn btn-success me-2"
					v-tooltip="'Refresh the list of available project namespaces'"
				/>
			</div>
		</div>
		<div class="editor card-body h-100">
			<json-editor
				v-model="nsContent"
				mode="text"
				class="h-100"
				read-only
			/>
		</div>
	</div>
</template>
