<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
        </base-header>

        <div class="container-fluid mt--7" v-if="test && user">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="card-body pt-0 pt-md-4">
                            <div>
                                <h1>{{test.title}}</h1>
                                <span >Time slot : {{convertDate(test.timings.from)}}</span> to <span>{{convertDate(test.timings.to)}}</span><br>
                                <span >Duration : {{test.timings.duration}}  Hours</span><br>
                                <span >Price : {{test.price}}  INR</span>
                                <br>
                                <br>
                                <p>{{test.description}}</p>
                            </div>

                        </div>
                        <br>
                        <a v-if="registered && completed" disabled class="btn btn-info text-white">You've completed this test</a>
                        <router-link :to="'/test/'+testId" v-if="registered && !completed" class="btn btn-info text-white">Start Test</router-link>
                        <a v-if="!registered && !processingPayment" @click="launchRazorpay" class="btn btn-info text-white">Pay and Register</a>
                        <a v-if="!registered && processingPayment && !completed" disabled class="btn btn-info text-white">Waiting for Payment Completion...</a>
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
                                
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
        <modal :show.sync="paymentCompleted"
               gradient="success"
               modal-classes="modal-success modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">Your payment has been completed.</h6>

            <div class="py-3 text-center">
                <i class="ni ni-bell-55 ni-3x"></i>
                <h4 class="heading mt-4">You've been registered for the quiz</h4>
                <p>Make sure you attempt the quiz in the given time period</p>
            </div>

            <template slot="footer">
                <base-button type="white" @click="paymentCompleted=false">Done!</base-button>
            </template>
        </modal>
        <modal :show.sync="paymentFailed"
               gradient="danger"
               modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">Payment Failed!</h6>

            <div class="py-3 text-center">
                <i class="ni ni-bell-55 ni-3x"></i>
                <h4 class="heading mt-4">Your Payment could not go through</h4>
                <p>{{paymentError}}</p>
            </div>

            <template slot="footer">
                <base-button type="white" @click="paymentFailed=false">Try Again</base-button>
                <base-button type="link"
                             text-color="white"
                             class="ml-auto"
                             @click="goToSupport()">
                    Contact Support
                </base-button>
            </template>
        </modal>
    </div>
</template>
<script>
    import axios from 'axios'
    import firebaseApp from '../../firebaseConfig'
    export default {
        name: 'user-profile',
        data() {
            return {
                user: null,
                testId:'',
                test:null,
                waitingForTransactionCompletion:false,
                transactionStatusPercent:0,
                paymentFailed:false,
                paymentError:"",
                paymentCompleted:false,
                registered:false,
                completed:false,
                processingPayment:false
            }
        },
        props: {
            uid:String
        },
        beforeMount(){
            // this.user = JSON.parse(localStorage.getItem('user'))

            this.testId = this.$route.params.testId
            firebaseApp.db.doc('users/'+this.uid).onSnapshot(snapshot=>{
                this.user = snapshot.data()
                if(this.user.registeredTests.some(test=> test.id == this.testId)){
                    this.registered = true
                }
                if(this.user.registeredTests.some(test=> (test.id == this.testId && test.completed))){
                    this.completed = true
                }
            })
            firebaseApp.db.doc('tests/'+this.testId).onSnapshot(snapshot=>{
                this.test = snapshot.data()
                console.log(this.test)
            })
        },
        methods:{
            launchRazorpay(){
                let self = this
                var options = {
                    "key": "rzp_test_QD1Usn6rPsxYdZ",
                    "amount": self.test.price*100, // 2000 paise = INR 20
                    "name": self.test.title,
                    "image": "/your_logo.png",
                    "handler": function (response){
                        self.verifySignature(response)
                        // // firebaseApp.db.doc('tests/'+self.testId+"/"+registeredUsers+"/"+self.user.)
                        // firebaseApp.db.doc('tests/'+self.testId).onSnapshot(snapshot=>{
                        //     self.test = snapshot.data()
                        //     console.log(self.test)
                        // })
                        // alert(response.razorpay_payment_id);
                    },
                    "prefill": {
                        "name": self.user.name,
                        "contact":self.user.phone,
                        "email": self.user.email
                    },
                    "theme": {
                        "color": "#33C5B8"
                    }
                };
                // 1. GENERATE ORDER_ID using razorpay/order api
                axios.post('http://localhost:5000/quizapp-20/us-central1/paymentApi',{
                    amount:this.test.price*100,
                    orderId:this.testId + "-" + this.user.uid
                })
                .then((res)=>{
                    var rzp1 = new Razorpay({...options,order_id:res.data.id});
                    rzp1.open();
                })
                .catch((err)=>{console.log("ERR",err);this.processingPayment=false});
                // rzp1.open();
            },
            verifySignature(response){
                this.processingPayment = true
                axios.post('http://localhost:5000/quizapp-20/us-central1/paymentApi/confirmPayment',response).then((res)=>{
                    console.log("PAYMENT RESPONSE",res)
                    let transactionInfo = JSON.parse(res.data.body).items[0]
                    transactionInfo["testId"] = this.testId
                    transactionInfo["uid"] = this.user.uid
                    this.user.registeredTests.push({"id":this.testId,"completed":false})
                    let registerArr = [
                        firebaseApp.db.doc("transactions/"+transactionInfo.id).set(transactionInfo),
                        firebaseApp.db.doc("tests/"+this.testId+"/registeredUsers/"+this.user.uid).set(this.user),
                        firebaseApp.db.doc("users/"+this.user.uid).update({"registeredTests":this.user.registeredTests})
                    ]
                    Promise.all(registerArr).then(res=>{
                        this.paymentCompleted = true
                        this.$router.push("/registered")
                    })
                }).catch((err)=>{
                    this.paymentFailed = true
                    this.processingPayment = false
                    this.paymentError = err.message
                })
            },
            goToSupport(){
                this.$router.push("/support")
            },
            convertDate(date){
                var arr_date = date.split('-'),
                    months   = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                return(parseInt(arr_date[2]) + ' ' + months[parseInt(arr_date[1])] + ', ' + arr_date[0]);

            }
        }
        
    };
</script>
<style></style>
