<script>
import JsonEditor from 'json-editor-vue';

export default {
	components: {
		JsonEditor,
	},
	data() { return {
		/**
		* Whether the editor component is loading or refreshing
		* @type {Boolean}
		*/
		isLoading: true,
	}},
	async created() {
		// Wait for $tera to be ready
		await this.$tera.init();

		// Ensure there is an active project
		await this.$tera.requireProject();

		// Wait for state / project list to finalize
		await this.$tera.statePromise();

		this.isLoading = false;
	},
}
</script>

<template>
	<div class="editor">
		<div v-if="isLoading" class="loading d-flex-center fs-1">
			<i class="fas fa-spinner fa-spin me-3"/>
			Loading...
		</div>
		<div v-else class="card h-100">
			<div class="card-header d-flex-center justify-content-between">
				<div class="dropdown">
					<a
						id="dropdownProjectSelect"
						class="clickable dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						{{$tera.state.name}}
					</a>
					<ul class="dropdown-menu" aria-labelledby="dropdownProjectSelect">
						<li v-for="project in $tera.projects" :key="project.id">
							<a class="dropdown-item clickable">
								{{project.name}}
							</a>
						</li>
					</ul>
				</div>
				<a @click="$tera.selectProject({setActive: true})" class="badge bg-primary">
					{{$tera.state.id}}
				</a>
			</div>
			<div class="card-body p-0 h-100">
				<json-editor
					v-model="$tera.state"
					mode="text"
					class="h-100"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.editor {
	--bs-card-bg: transparent;
	--jse-background-color: transparent;

	&, & > * {
		width: 100%;
		height: 100%;
	}

	& .loading {
	}

	a.badge {
		cursor: pointer;
		&:hover {
			color: var(--bs-white);
		}
	}
}
</style>
