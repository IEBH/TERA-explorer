<script>
import Editor from './editor.vue';
import Files from './files.vue';
import Namespaces from './namespaces.vue';
import Session from './session.vue';

export default {
	components: {
		Editor,
		Files,
		Namespaces,
		Session,
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

		this.isLoading = false;
	},
}
</script>

<template>
	<div class="frame">
		<div v-if="isLoading" class="loading d-flex-center fs-1">
			<i class="fas fa-spinner fa-spin me-3"/>
			Loading...
		</div>
		<div v-else class="card h-100">
			<div class="card-header d-flex-center justify-content-between p-0">
				<div class="dropdown">
					<a
						id="dropdownProjectSelect"
						class="btn btn-light ms-1 px-2"
						type="button"
						v-tooltip="{
							allowHTML: true,
							content:
								`<div><strong>Project ID:</strong> ${$tera.project.id}</div>`
								+ `<div class='text-center fst-italic mt-2'>Click to change project</div>`,
						}"
						@click="$tera.selectProject({setActive: true})"
					>
						{{$tera.project.name}}
					</a>
				</div>
				<ul class="nav nav-tabs pt-2 pe-2">
					<li class="nav-item">
						<a class="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-state">State</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-namespaces">Namespaces</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-files">Files</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-session">Session</a>
					</li>
				</ul>
			</div>
			<div class="card-body p-0 h-100">
				<div class="tab-content h-100">
					<div id="nav-state" class="tab-pane fade show active h-100" role="tabpanel">
						<editor/>
					</div>
					<div id="nav-namespaces" class="tab-pane fade h-100" role="tabpanel">
						<namespaces/>
					</div>
					<div id="nav-files" class="tab-pane fade h-100" role="tabpanel">
						<files/>
					</div>
					<div id="nav-session" class="tab-pane fade h-100" role="tabpanel">
						<session/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.frame {
	--bs-card-bg: transparent;
	--jse-background-color: transparent;

	&, & > * {
		width: 100%;
		height: 100%;
	}

	& .loading {
	}

	a.badge {
		&:hover {
			color: var(--bs-white);
		}
	}
}
</style>
