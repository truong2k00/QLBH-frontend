<script setup lang="ts">
import { useTheme } from 'vuetify'

import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'

import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import setAuthHeader from '@/plugins/setAuthHeader'
import login from '@/services/auth/login'
import { AuthMessage } from '@/common/constants/auth'
import { ITokenRes } from '@/interfaces/res/IToken.res'
import { error } from 'console'

import localStorageKey from '@/common/constants/LocalStorageKey'

const base = import.meta.env.BASE_URL
const route = useRoute()
const router = useRouter()

const err = ref({
  errcheck: false,
  errmessage: '',
})
const form = ref({
  email: '',
  password: '',
  remember: false,
})

onMounted(() => {
  localStorage.removeItem(localStorageKey.ACCESS_TOKEN)
  localStorage.removeItem(localStorageKey.USER_DATA)
})
const loginUser = async () => {
  try {
    const res = await login(form.value.email, form.value.password)

    if (res) {
      setAuthHeader(res.AccessToken)
      localStorage.setItem(localStorageKey.ACCESS_TOKEN, res.RefreshToken)
      router.replace(route.query.to ? String(route.query.to) : '/')
    } else {
      err.value.errmessage = AuthMessage.LoginFail
      err.value.errcheck = true
      // Xử lý thông báo lỗi hoặc các xử lý khác ở đây
    }
    // Gán dữ liệu vào biến tham chiếu
  } catch (error) {
    err.value.errmessage = AuthMessage.LoginError
    err.value.errcheck = true
  }
}
const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

onMounted(() => {
  localStorage.removeItem(localStorageKey.ACCESS_TOKEN)
  localStorage.removeItem(localStorageKey.USER_DATA)
})
const isPasswordVisible = ref(false)
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          {{ app_title }}
        </VCardTitle>
      </VCardItem>
      <VCardText
        v-if="err.errcheck"
        class="front-bold"
        >{{ err.errmessage }}</VCardText
      >
      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">Welcome to {{ app_title }}! 👋🏻</h5>
        <p class="mb-0">Please sign-in to your account and start the adventure</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email or Username"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <a
                  class="ms-2 mb-1"
                  href="javascript:void(0)"
                >
                  Forgot Password?
                </a>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
                @click="loginUser()"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
                Create an account
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
.front-bold {
  text-align: center;
  color: red;
  font-weight: bold;
}
</style>

function setAuthHeader(arg0: null) { throw new Error('Function not implemented.') } function setAuthHeader(arg0: null) {
throw new Error('Function not implemented.') }
