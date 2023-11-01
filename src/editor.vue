<script>
export default {
	data() { return {
		$tera: {
			list: [
				{id: 'FAKEPROJ', name: 'A fake project'},
				{id: 'FAKE2', name: 'Fake project #2'},
				{id: 'FAKE3', name: 'Fake project #3'},
			],
			state: {
				id: 'FAKEPROJ',
				name: 'A fake project',
			},
		},
	}},
}
</script>

<template>
	<div class="editor container">
		<div class="card">
			<div class="card-header d-flex-center justify-content-between">
				<div class="dropdown">
					<a class="dropdown-toggle" type="button" id="dropdownProjectSelect" data-bs-toggle="dropdown" aria-expanded="false">
						{{$tera.state.name}}
					</a>
					<ul class="dropdown-menu" aria-labelledby="dropdownProjectSelect">
						<li v-for="project in $tera.list" :key="project.id">
							<a class="dropdown-item">
								{{project.name}}
							</a>
						</li>
					</ul>
				</div>
				<span class="badge bg-primary">
					{{$tera.state.id}}
				</span>
			</div>
			<div class="card-body">
				<pre>Project: {{$tera.state}}</pre>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.editor {
	width: 100%;
	height: 100%;

	& .card {
		width: 100%;
		height: 100%;
	}
}
</style>
