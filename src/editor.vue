<script>
import {cloneDeep, get as _get} from 'lodash-es';
import JsonEditor from 'json-editor-vue';

export default {
	components: {
		JsonEditor,
	},
	data() { return {
		/**
		* A local copy of the $tera.state
		* This is a deep clone to remove al lthe $tera reactivity
		*/
		localState: null,

		/**
		* Array notation sub-path we are focusing on within the main state, if any
		* @type {Array<String>}
		*/
		subPath: null,

		/**
		* The object to save back to the $tera.state object
		* Also signifies that the state is dirty if not falsy
		* @type {Object}
		*/
		dirtyState: null,

		/**
		* How many changes have occured since the last save operationo
		* @type {Number}
		*/
		dirtyStateCount: 0,

		/**
		* Signifies that a save operation is currently running
		* @type {Boolean}
		*/
		isSaving: false,
	}},
	methods: {
		/**
		* Reload state, either from the TERA state OR the subpath
		*/
		refresh() {
			console.log('Providing state from path', this.subPath || 'ROOT');

			// Copy local state to local
			this.localState = cloneDeep(
				this.subPath
					? _get(this.$tera.state, this.subPath)
					: this.$tera.state
			);

			// Reset dirty state
			this.dirtyState = null;
		},


		save() {
			if (!this.dirtyState) return; // Nothing to do

			Promise.resolve()
				.then(()=> this.isSaving = true)
				.then(()=> this.subPath
					? this.$tera.setProjectState(this.subPath, this.dirtyState)
					: this.$tera.replaceProjectState(this.dirtyState)
				)
				.then(()=> this.dirtyState = null)
				.finally(()=> this.isSaving = false)
		},


		/**
		* Svelte handling function to act as a callback when state is changed
		* The input can be either unpased JSON or a JSON object
		*
		* @param {Object|String} newState The new state to set
		*/
		setDirtyState(newState) {
			this.dirtyStateCount++;
			this.dirtyState = newState.text && typeof newState.text == 'string' ? JSON.parse(newState.text) // json-editor sometimes sets the state as a string
				: newState.object ? newState.object // json-editor gave us an object partition
				: newState; // Use raw input
		},


		/**
		* Svelte handling function to dictate the layout of the menu
		*/
		renderMenu(items) {
			return items
				.filter(i =>
					i.className != 'jse-transform' // Remove filter menu
					&& i.type != 'space' // Remove final spacer
				)
				.concat([
					{type: 'separator'},
					{
						type: 'button',
						onClick: ()=> this.promptSubpath(),
						icon: items.find(i => i.className == 'jse-transform').icon, // Copy from the icon we removed above
						text: '',
						title: 'Focus on a given path',
						className: 'jse-focus',
						disabled: false,
					},
					{type: 'space'},
				])
		},


		/**
		* Prompt for a sub-path and update the display content there
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		promptSubpath() {
			return this.$tera.uiPrompt({
				title: 'Enter subpath',
				body: 'Enter the sub-path to focus as a dotted.notation.path',
			})
				.then(v => this.subPath = v)
				.then(()=> this.refresh())
		},


		/**
		* DOM level key handler
		* Used to bind Ctrl+S to this.save()
		*/
		keyHandler(e) {
			if (e.ctrlKey && e.code == 'KeyS' && this.dirtyState) {
				e.preventDefault();
				return this.save();
			}
		},
	},
	watch: {
		'$tera.state': {
			immediate: true,
			deep: true,
			handler: 'refresh',
		},
	},
	mounted() {
		// Listen for Ctrl+S and bind it to this.save()
		document.addEventListener('keydown', this.keyHandler);
	},
	beforeUnmount() {
		document.removeEventListener('keydown', this.keyHandler);
	},
}
</script>

<template>
	<div class="editor h-100">
		<json-editor
			v-model="localState"
			mode="text"
			class="h-100"
			:onChange="setDirtyState"
			:onRenderMenu="renderMenu"
		/>
		<div class="floating-toolbar" :class="dirtyState && 'active'">
			<a
				class="btn btn-lg btn-success"
				v-tooltip="{
					allowHTML: true,
					content:
						`<div>${dirtyStateCount > 1 ? 'Save ' + dirtyStateCount + ' changes' : 'Save change'}</div>`
						+ `<div class='text-center fst-italic mt-2'>(Ctrl + S)</div>`,
				}"
				@click="save"
			>
				<span v-if="dirtyStateCount > 1" class="badge bg-info fs-6 p-1">
					{{dirtyStateCount}}
				</span>
				<i :class="isSaving ? 'fas fa-spinner fa-spin' : 'fas fa-check'"/>
			</a>
		</div>
	</div>
</template>

<style lang="scss">
.editor {
	& .jse-main {
		height: calc(100% - 50px) !important;
	}

	.floating-toolbar {
		position: fixed;
		bottom: -100px;
		right: 20px;
		z-index: 100;
		transition: bottom ease-out 0.25s;

		&.active {
			bottom: 20px;
		}

		& .btn {
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 5px 0 5px #0005;

			font-size: 32px;
			border-radius: 50%;
			width: 70px;
			height: 70px;
		}

		& .badge {
			position: absolute;
			right: 0px;
			top: -10px;
		}
	}
}
</style>
