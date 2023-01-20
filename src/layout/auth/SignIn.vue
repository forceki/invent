<template>
    <div class="w-full h-full justify-center items-center">
        <p class="font-semibold text-slate-500">
            Sign In
        </p>
    </div>
</template>

<script setup>
import Cookies from 'js-cookie'
import {user} from '@/stores/user.ts';
import axios from 'axios'
//@ts-ignore
import router from '@/router';

const USER = user()

const LOGGING = async()=>{
    try {
        let token = Cookies.get('accessCode')

        console.log(token)
        
        const data = await axios.get(import.meta.env.VITE_API_URL+"/login",{
            headers : {
                accessCode : token
            }
        })

        console.log(data)
        Cookies.set('access_token', data.data.token)
    
        USER.SET_USER(data.data.data)
        USER.SET_USER_MODULE(data.data.module)
        router.push('/');   
        
    } catch (error) {
      window.location.href = import.meta.env.VITE_API_LOGIN_PAGE_SSO
        console.log(error)
    }

}

LOGGING()
</script>

<style>

</style>