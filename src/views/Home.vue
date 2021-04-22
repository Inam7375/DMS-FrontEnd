<template>
	<div>
		<b-row class="flex grid grid-cols-4 md:flex-grow">
			<b-col class="flex-grow col-span-2">
				<vx-card class="image" style="height:15em">
					<b-row class="mt-8 grid grid-cols-6 gap-2">
						<b-col class="col-span-5">
								<p style="color:white" class="text-5xl font-bold 	subpixel-antialiased">Created Documents</p>
						</b-col>
						<b-col>
							<b-avatar button badge-offset="-2px" badge="15" badge-top badge-right class="mt-2" variant="primary" size="lg" icon="file-bar-graph" badge-variant="success"/>
						</b-col>
					</b-row>
					<br>
					<br>
				</vx-card>
			</b-col>
			<b-col class="flex-grow">
				<vx-card class="image" style="height:15em">
					<b-avatar class="mt-2" variant="primary" size="lg" icon="file-bar-graph"/><br>
					<p style="color:white" class="text-5xl font-bold 	subpixel-antialiased">20</p>
					<p style="color:white" class="text-2xl subpixel-antialiased">Pending Documents</p>
				</vx-card>
			</b-col>
			<b-col class="flex-grow">
				<vx-card class="image" style="height:15em">
					<b-avatar class="mt-2" variant="primary" size="lg" icon="file-bar-graph"/><br>
					<p style="color:white" class="text-5xl font-bold 	subpixel-antialiased">30</p>
					<p style="color:white" class="text-2xl subpixel-antialiased">Forwarded Documents</p>
				</vx-card>
			</b-col>
		</b-row>
		<h4>You are in home.</h4>
	</div>
</template>

<script>
import VxCard from '../components/vx-card/VxCard.vue'
export default{
	name: 'Home',
  	components: { VxCard },
}
</script>

<style scoped>
	.image {
		background-image: url("../assets/images/components/paper-brown.jpg");
		/* background-color: #cccccc; */
		height: 500px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		/* opacity: 70%; */
	}
</style>