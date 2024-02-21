<script>
import {cloneDeep} from 'lodash-es';
import JsonEditor from 'json-editor-vue';

export default {
	components: {
		JsonEditor,
	},
	data() { return {
		isDirty: false,
		isSaving: false,
		localState: cloneDeep(this.$tera.state), // Deep copy state so we can save it manually when needed
	}},
	methods: {
		save() {
			Promise.resolve()
				.then(()=> this.isSaving = true)
				.then(()=> typeof this.localState == 'string' // json-editor sometimes sets the state as a string
					? JSON.parse(this.localState)
					: this.localState
				)
				.then(newState => this.$tera.replaceProjectState(newState))
				.then(()=> this.isDirty = false)
				.finally(()=> this.isSaving = false)
		},

		/**
		* DOM level key handler
		* Used to bind Ctrl+S to this.save()
		*/
		keyHandler(e) {
			if (e.ctrlKey && e.code == 'KeyS' && this.isDirty) {
				e.preventDefault();
				return this.save();
			}
		},
	},
	mounted() {
		// Listen for Ctrl+S and bind it to this.save()
		document.addEventListener('keydown', this.keyHandler);
	},
	beforeUnmount() {
		document.removeEventListener('keydown', this.keyHandler);
	},
	watch: {
		localState() {
			this.isDirty = true;
		},
		'$tera.state': {
			deep: true,
			handler() {
				// React to remote changes
				this.localState = cloneDeep(this.$tera.state);
			},
		},
	},
}
</script>

<template>
	<div class="h-100">
		<json-editor
			v-model="localState"
			mode="text"
			class="h-100"
		/>
		<div class="floating-toolbar" :class="isDirty && 'active'">
			<a @click="save" class="btn btn-lg btn-success" v-tooltip="'Save changes (Ctrl+S)'">
				<i :class="isSaving ? 'fas fa-spinner fa-spin' : 'fas fa-check'"/>
			</a>
		</div>
	</div>
</template>

<style lang="scss">
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
}
</style>
