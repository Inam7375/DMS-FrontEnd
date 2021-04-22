<template>
    <div>
        <vx-card>
            <vs-tabs>
                <vs-tab label="Profile" icon="UserIcon">
                    <div class="con-tab-ejemplo">
                        <b-form>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <b-form-group
                                    class="text-xl"
                                    id="Name"
                                    label="Full Name"
                                    label-for="name"
                                    description="Please write your full name here."
                                    >
                                    <b-form-input
                                        id="name"
                                        v-model="name"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                    ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div>
                                    <b-form-group
                                    class="text-xl"
                                    id="UName"
                                    label="Username"
                                    label-for="username"
                                    description="Write a unique username here."
                                    >
                                    <b-form-input
                                        id="username"
                                        v-model="username"
                                        type="text"
                                        placeholder="John123"
                                        required
                                    ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div>
                                    <b-form-group
                                    class="text-xl"
                                    id="Department"
                                    label="Department"
                                    label-for="department"
                                    >
                                    <b-form-select
                                        style="background-color:#262C49;"
                                        id="departmet"
                                        v-model="department"
                                        :options="departments"
                                        required
                                    ></b-form-select>
                                    </b-form-group>
                                </div>
                                <div>
                                    <b-form-group
                                    class="text-xl"
                                    id="Email"
                                    label="Email"
                                    label-for="email"
                                    >
                                    <b-form-input
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        placeholder="someone@gmail.com"
                                        required
                                    ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div>
                                    <b-form-group
                                    class="text-xl"
                                    id="Role"
                                    label="Role"
                                    label-for="role"
                                    >
                                    <b-form-select
                                        style="background-color:#262C49;"
                                        id="role"
                                        v-model="role"
                                        :options="roles"
                                        required
                                    ></b-form-select>
                                    </b-form-group>
                                </div>
                            </div>
                        </b-form>
                    </div>
                </vs-tab>
                <vs-tab label="Information">
                    <div class="con-tab-ejemplo">
                        Information
                    </div>
                </vs-tab>
                <vs-tab label="Social">
                    <div class="con-tab-ejemplo">
                        Social
                    </div>
                </vs-tab>
            </vs-tabs>
        </vx-card>
    </div>
</template>

<script>
import VxCard from '../../components/vx-card/VxCard.vue';
export default {
    name: 'userProfile',
    components: {
        VxCard
    }
}
</script>