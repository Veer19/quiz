<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                
                <div class="row">
                    <div class="col-lg-3 col-md-12">
                    <img :src="user.photoURL" class="rounded-circle">
                    </div>
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Hello {{user.name}}</h1>
                        <p class="text-white mt-0 mb-5">This is your profile page. You can view or change your account details at any time. The same will be forwarded to the tests that you register for.</p>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">My account</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <base-input alternative=""
                                                        label="Name"
                                                        placeholder="Enter Name"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.name"
                                            />
                                        </div>
                                        
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email"
                                                        placeholder="Enter Email"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.email"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Phone"
                                                        placeholder="Enter Phone Number"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.phone"
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                                <hr class="my-4" />
                                <!-- Education -->
                                <h6 class="heading-small text-muted mb-4">Education information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <base-input alternative=""
                                                        label="College"
                                                        placeholder="Enter College Name"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.college"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Stream"
                                                        placeholder="Enter Stream"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.stream"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Semester"
                                                        placeholder="Enter Semester"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.semester"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="pl-lg-4">
                                    <a @click="editProfileDetails" class="btn btn-info text-white">Save Changes</a>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import firebaseApp from '../../firebaseConfig'
    export default {
        name: 'user-profile',
        data() {
        return {
            user: {
            name: '',
            email: '',
            phone:'',
            college: '',
            stream: '',
            year: '',
            },
            uid:''
        }
        },
        beforeMount(){
            this.uid = localStorage.getItem('uid')
            firebaseApp.db.doc('users/'+this.uid).onSnapshot(snapshot=>{
                this.user = snapshot.data()
            })
        },
        methods:{
            editProfileDetails(){
                
                firebaseApp.db.doc('users/'+this.uid).update(this.user).then(snapshot=>{
                    this.$toast.open({
                        message: "Changes Saved",
                        type: "success",
                        duration: 5000,
                        dismissible: true
                    }) 
                }).catch(err=>{
                    this.$toast.open({
                        message: err.message,
                        type: "error",
                        duration: 5000,
                        dismissible: true
                    }) 
                })
            }
        }

    };
</script>
<style></style>
