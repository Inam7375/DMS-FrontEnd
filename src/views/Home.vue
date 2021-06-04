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
		</b-row><br><br>
		<vx-card >
			<p class="text-3xl">All Documents</p>
			<div class="con-tab-ejemplo">
				<vs-table max-items="5" search pagination :data="all_documents">
					<div slot="thead" class="grid grid-cols-8 gap-4">
					<vs-th sort-key="_id" style="flex-grow:1">
						Document ID
					</vs-th>
					<vs-th sort-key="title" style="flex-grow:1">
						Title
					</vs-th>
					<vs-th sort-key="created_by_user" style="flex-grow:1"> 
						Created By
					</vs-th>
					<vs-th  sort-key="created_by_department" style="flex-grow:1"> 
						From Dep
					</vs-th>
					<vs-th sort-key="target_user" style="flex-grow:1">
						Forwarded To  
					</vs-th>
					<vs-th sort-key="target_department" style="flex-grow:1">
						Forwarded Dep  
					</vs-th>
					<vs-th sort-key="target_department" style="flex-grow:1">
						Date Created  
					</vs-th>
					<vs-th sort-key="role" style="flex-grow:1">
						Actions  
					</vs-th>
					</div>

					<div slot-scope="{data}">
					<vs-tr :state="tr.role == 'Super Admin'?'success':tr.role == 'Admin'?'primary':null" :key="indextr" v-for="(tr, indextr) in data" class="grid grid-cols-8 gap-4">
						<vs-td :data="data[indextr]._id">
						{{data[indextr]._id}}
						</vs-td>
						<vs-td :data="data[indextr].title">
						{{data[indextr].title}}
						</vs-td>

						<vs-td :data="tr.created_by_user">
						{{tr.created_by_user}}
						</vs-td>

						<vs-td :data="tr.created_by_department">
						{{tr.created_by_department}} 
						</vs-td>

						<vs-td :data="tr.target_user">
						{{tr.target_user}}
						</vs-td>

						<vs-td :data="tr.target_department">
						{{tr.target_department}}
						</vs-td>

						<vs-td :data="tr.date_created">
						{{tr.date_created}}
						</vs-td>
						<vs-td>
							<div>
							<router-link :to="{name: 'document', params: {docID: tr._id}}">
								<vs-button @click="toggleCreator" radius size="large" line-position="left" color="success" type="flat" icon="edit"></vs-button>
							</router-link>
							</div>
						</vs-td>
					</vs-tr>
					</div>
				</vs-table>
			</div>
		</vx-card>
	</div>
</template>

<script>
import VxCard from '../components/vx-card/VxCard.vue'
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';

export default{
	name: 'Home',
	data () {
		return {
			isAdmin : false,
			value1: "",
			payloadUname: "",
			all_documents: []

		}
	},
  	components: { VxCard },
	methods : {
		get_all_documents: async function() {
			const payload = VueJwtDecode.decode(localStorage.getItem('access-token'))
			if (this.isAdmin == true){
				const res = await axios.get('http://localhost:5000/api/documents')
				this.all_documents = res.data.results
			}else{
				this.payloadUname = payload['username']
				const res = await axios.get(`http://localhost:5000/api/userdocuments/${this.payloadUname}`)
				this.all_documents = res.data.results
			}
		}
	},
	created() {
		if (localStorage.getItem('isAdmin') == "true"){
			this.isAdmin = true
		}else{
			this.isAdmin = false
		}
		this.get_all_documents()
	}
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