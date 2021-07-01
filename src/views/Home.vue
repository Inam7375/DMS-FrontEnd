<template>
	<div>
		<b-row class="flex grid grid-cols-4 md:flex-grow">
			<b-col class="flex-grow col-span-2">
				<vx-card class="image" style="height:15em">
					<b-row class="mt-8 grid grid-cols-6 gap-2">
						<b-col class="col-span-5">
							<p
								style="color:white"
								class="text-5xl font-bold 	subpixel-antialiased"
							>
								All Documents
							</p>
						</b-col>
						<b-col>
						
								<p style="color:white" class="text-5xl font-bold 	subpixel-antialiased">{{all_documents.length}}</p>
						</b-col>
					</b-row>
					<br />
					<br />
				</vx-card>
			</b-col>
			<b-col class="flex-grow">
				<vx-card class="image" style="height:15em">
				

					<p style="color:white" class="text-2xl subpixel-antialiased">
						Pending Documents
					</p>
						<p style="color:white" class="text-5xl font-bold 	subpixel-antialiased">{{userPendingDocs.length}}</p>
				</vx-card>
			</b-col>
			<b-col class="flex-grow">
				<vx-card class="image" style="height:15em">
				
					<p style="color:white" class="text-2xl subpixel-antialiased">
						Completed Documents Documents
					</p>
						<p style="color:white" class="text-5xl font-bold 	subpixel-antialiased">{{userCompletedDocs.length}}</p>
				</vx-card>
			</b-col> </b-row
		><br /><br />
		<vx-card>
			<p class="text-3xl customcolor">All Documents</p>
			<div class="con-tab-ejemplo">
				<div class="grid grid-cols-6" style="margin-left:30%;">
					<div>
						<p
							style="font-size:15px; font-weight:bold; padding-top:.5em; padding-left:2em;"
						>
							Filter Entries :
						</p>
					</div>
					<div class="col-span-5">
						<b-form-select
							style="width:20%; font-size:20px; border-radius:10px;"
							v-model="selectedEntry"
							:options="entryOptions"
						></b-form-select>
					</div>
				</div>
				<vs-table
					:max-items="selectedEntry"
					search
					pagination
					:data="all_documents"
				>
					<div slot="thead" class="grid grid-cols-8 gap-4 custom text-3xl">
						<vs-th sort-key="_id" style="flex-grow:1">
							Document ID
						</vs-th>
						<vs-th sort-key="title" style="flex-grow:1">
							Title
						</vs-th>
						<vs-th sort-key="created_by_user" style="flex-grow:1">
							Created By
						</vs-th>
						<vs-th sort-key="created_by_department" style="flex-grow:1">
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

					<div slot-scope="{ data }">
						<vs-tr
							:state="
								tr.role == 'Super Admin'
									? 'success'
									: tr.role == 'Admin'
									? 'primary'
									: null
							"
							:key="indextr"
							v-for="(tr, indextr) in data"
							class="grid grid-cols-8 gap-4 custom-color"
						>
							<vs-td :data="data[indextr]._id">
								{{ data[indextr]._id }}
							</vs-td>
							<vs-td :data="data[indextr].title">
								{{ data[indextr].title }}
							</vs-td>

							<vs-td :data="tr.created_by_user">
								{{ tr.created_by_user }}
							</vs-td>

							<vs-td :data="tr.created_by_department">
								{{ tr.created_by_department }}
							</vs-td>

							<vs-td :data="tr.target_user">
								{{ tr.target_user }}
							</vs-td>

							<vs-td :data="tr.target_department">
								{{ tr.target_department }}
							</vs-td>

							<vs-td :data="tr.date_created">
								{{ tr.date_created }}
							</vs-td>
							<vs-td>
								<div>
									<router-link
										:to="{ name: 'document', params: { docID: tr._id } }"
									>
										<vs-button
											radius
											size="large"
											line-position="left"
											color="success"
											type="flat"
											icon="edit"
										></vs-button>
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
import VxCard from "../components/vx-card/VxCard.vue";
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";

export default {
	name: "Home",
	data() {
		return {
			isAdmin: false,
			selectedEntry: "5",
			value1: "",
			payloadUname: "",
			userCreatedDocs: [],
			userPendingDocs: [],
			userCompletedDocs: "",
			all_documents: [],
			entryOptions: [
				{ value: 5, text: "5" },
				{ value: 10, text: "10" },
				{ value: 20, text: "20" },
				{ value: 30, text: "30" },
				{ value: 40, text: "40" },
				{ value: 50, text: "50" },
				{ value: 70, text: "70" },
				{ value: 100, text: "100" },
			],
		};
	},
	components: { VxCard },
	methods: {
		get_all_documents: async function() {
			const payload = VueJwtDecode.decode(localStorage.getItem("access-token"));
			if (this.isAdmin == true) {
				const res = await axios.get("http://localhost:5000/api/documents");
				this.all_documents = res.data.results;
			} else {
				this.payloadUname = payload["username"];
				const res = await axios.get(
					`http://localhost:5000/api/userdocuments/${this.payloadUname}`
				);
				this.all_documents = res.data.results;
			}
		},
		count_all_documents: async function() {
			const payload = VueJwtDecode.decode(localStorage.getItem("access-token"));
			this.payloadUname = payload["username"];
			const user_created = await axios.get(
				`http://localhost:5000/api/userdocuments/${this.payloadUname}`
			);
			this.userCreatedDocs = user_created.data.results.length;
			const user_completed = await axios.get(
				`http://localhost:5000/api/usercompleteddocuments/${this.payloadUname}`
			);
			this.userCompletedDocs = user_completed.data.results;
			// console.log(userCompletedDocs);
			const user_pending = await axios.get(
				`http://localhost:5000/api/userpendingdocuments/${this.payloadUname}`
			);
			this.userPendingDocs = user_pending.data.results;
			// console.log(user_created)
			console.log(user_completed)
			console.log(user_pending)
		},
	},
	created() {
		if (localStorage.getItem("isAdmin") == "true") {
			this.isAdmin = true;
		} else {
			this.isAdmin = false;
		}
		this.get_all_documents();
		this.count_all_documents();
	},
};
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
.custom {
	font-weight: bold;
	color: #fff;
	background-color: #10163a;
}
.customcolor {
	color: #7367f0;
}
.custom-color {
	color: black;
}
.custom-color:nth-child(even) {
	background-color: #f2f2f2;
}
</style>
