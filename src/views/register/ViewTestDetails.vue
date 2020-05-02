<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="card-body pt-0 pt-md-4">
                            <div>
                                <h1>{{test.title}}</h1>
                                <span >Time slot : {{test.timings.from}}</span> to <span>{{test.timings.to}}</span><br>
                                <span >Duration : {{test.timings.duration}}  Hours</span>
                                <br>
                                <br>
                                <p>{{test.description}}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Submit Profile Details</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
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
                                <!-- Education -->
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
                                    <a @click="editProfileDetails" class="btn btn-info text-white">Pay and Register</a>
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
            uid:'',
            testId:'',
            test:{}
        }
        },
        beforeMount(){
            // this.user = JSON.parse(localStorage.getItem('user'))
            this.testId = this.$route.params.testId
            this.uid = localStorage.getItem('uid')
            firebaseApp.db.doc('users/'+this.uid).onSnapshot(snapshot=>{
                this.user = snapshot.data()
            })
            firebaseApp.db.doc('tests/'+this.testId).onSnapshot(snapshot=>{
                this.test = snapshot.data()
                console.log(this.test)
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
