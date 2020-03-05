<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                        <div class="btn-wrapper text-center">
                            <a @click="loginGoogle" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a>
                        </div>
                    </div>
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div>
                        <form role="form">
                            
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-validate="'required|email'"
                                        name="email"
                                        v-model="email">
                            </base-input>
                            <div>{{ errors.first('email') }}</div>
                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="password"
                                        name="password">
                            </base-input>
                            <div>{{ errors.first('password') }}</div>
                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button @click="loginEmail" type="primary" class="my-4">Sign in</base-button>
                            </div>
                            {{error}}
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Forgot password?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
    import firebase from 'firebase'
    import firebaseApp from '../firebaseConfig'
    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: '',
                error:''
            }        
        },
        methods:{
            loginGoogle(){
                var provider = new firebase.auth.GoogleAuthProvider();
                firebaseApp.auth.signInWithPopup(provider)
                .then(snapshot=>{
                    let user = snapshot.user
                    return firebaseApp.db.doc("users/"+user.uid).get()
                    .then(doc => {
                        if(!doc.exists){
                            return firebaseApp.db.doc("users/"+ user.uid).set({
                                name : user.displayName,
                                email: user.email,
                                registeredTests:[]
                            })
                        }
                        else {
                            console.log(doc.data)
                            localStorage.setItem('user',JSON.stringify(doc.data))
                        }
                    })
                })
                .then(()=>{
                    this.$router.push('dashboard')
                })
            },
            loginEmail(){
                firebaseApp.auth.signInWithEmailAndPassword(this.email,this.password).then(user=>{
                    localStorage.setItem('user',JSON.stringify(this.userData))
                    this.$router.push('dashboard')
                })
                .catch(err=>{
                    this.error = err.message
                    console.log(err)
                })
            }
        }
    }
</script>
<style>
</style>
