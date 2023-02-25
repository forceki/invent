<template>
    <div class="bg-gray-50 dark:bg-gray-900 shadow-sm">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <!-- <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
                Flowbite    
            </a> -->
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Please Login
                    </h1>
                    <el-form 
                    label-position="top"
                    :rules="rules"
                    :model="form"
                    ref="ruleFormRef"
                    >
                        <el-form-item label="Username" prop="username">
                            <el-input
                                v-model="form.username"
                                placeholder="Please input username"
                            />
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                            <el-input
                                v-model="form.password"
                                type="password"
                                placeholder="Please input password"
                                show-password
                            />
                        </el-form-item>
                        <el-button type="primary" @click="LOGGING(ruleFormRef)">Login</el-button>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


import { user } from "@/stores/user.ts";
import Cookies from 'js-cookie'
import axios from 'axios'
//@ts-ignore
import router from '@/router';
import { reactive, ref, onMounted } from 'vue'
import { SuccessSwal, FailledSwal } from '../../components/SwallAlert/Alert'
import { FormInstance, FormRules } from 'element-plus';


const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
    username : [
        {required : true , message: 'Please input username', trigger: 'blur'}
    ],
    password : [
        {required:true, message: 'Please input password', trigger: 'blur'}
    ]
})


const form = reactive({
    username : '',
    password : ''
})


const USER = user();

const chceking = async () => {
    const check = Cookies.get("access_token")
    if(check){
        router.push("/checkins");
    }
}


const LOGGING = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate( async(valid, fields) => {
        if (valid) {
            try {
                const data = await axios.post(import.meta.env.VITE_API_ORIGIN + "auth/login", form);

                // console.log(data);
                // // if (data.success == 1) {
                Cookies.set("access_token", data.data.data.token);

                USER.SET_USER(data.data.data.user);
                // USER.setUserModule(data.data.module);
                router.push("/checkins");
                // } else {
                // window.location.href = import.meta.env.VITE_API_LOGIN_PAGE_SSO;
                // }
            } catch (error) {
            // window.location.href = import.meta.env.VITE_API_LOGIN_PAGE_SSO;
                FailledSwal("erorr!", error.response.data.message)

            }
        }
    })
};

onMounted(
    () => {
        chceking()
    }
) 

</script>
