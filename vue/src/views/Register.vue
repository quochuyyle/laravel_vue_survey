<!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <div>
    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
         alt="Workflow"/>
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for free</h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      {{ ' ' }}
      <router-link :to="{ name: 'Login', params: {} }" class="font-medium text-indigo-600 hover:text-indigo-500"> start
        your 14-day free trial
      </router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit.prevent="register">
    <Alert v-if="Object.keys(errors).length">
      <div v-for="(field, i) of Object.keys(errors)" :key="i" class="flex-col items-stretch text-sm">
        <div v-for="(error, ind) of errors[field] || []" :key="ind">
          * {{ error }}
        </div>
      </div>
    </Alert>
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="fullname" class="sr-only">Fullname</label>
        <input id="fullname" v-model="user.name" type="text" autocomplete="fullname" required=""
               class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Full name"/>
      </div>
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" v-model="user.email" type="email" autocomplete="email" required=""
               class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Email address"/>
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" v-model="user.password" type="password" autocomplete="current-password" required=""
               class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Password"/>
      </div>
      <div>
        <label for="password_confirmation" class="sr-only">Password Confirmation</label>
        <input id="password_confirmation" v-model="user.password_confirmation" type="password"
               autocomplete="current-password_confirmation" required=""
               class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Password Confirmation"/>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input id="remember-me" name="remember-me" type="checkbox"
               class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
        <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
      </div>

      <div class="text-sm">
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
      </div>
    </div>

    <div>
      <button
        :disabled="loading"
        type="submit"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        :class="{ 'cursor-not-allowed' : loading, 'hover:bg-indigo-500' : loading }"
      >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
            </span>
        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sign up
      </button>
    </div>
  </form>
</template>

<script>
import {LockClosedIcon} from '@heroicons/vue/solid'
import {reactive, ref} from "vue";
import store from "../store";
import {useRouter} from "vue-router";
import Alert from "../components/Alert.vue";

export default {
  name: "Register",
  components: {
    LockClosedIcon,
    Alert
  },
  setup() {
    const router = useRouter();
    const user = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });

    const loading = ref(false);
    const errors = ref({});

    function register() {
      loading.value = true;
      store.dispatch("register", user)
        .then(() => {
          loading.value = false;
          router.push({name: "Dashboard", params: {}});
        })
        .catch(err => {
          loading.value = false;
          if (err.response.status === 422) {
            errors.value = err.response.data.errors;
          }
        });
    }

    return {
      user,
      errors,
      loading,
      register
    }
  }
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
