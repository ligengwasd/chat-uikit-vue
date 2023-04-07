<template>
  <div :class="['login' + (env.isH5 ? '-h5' : '')]" data-env="H5">
    <main class="login-main">
      <div class="login-main-content">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="0" class="login-form">
          <el-form-item class="login-from-item" prop="userID">
            <el-input
              size="large"
              v-model="ruleForm.userID"
              :placeholder="$t('Login.请输入userID')"
              class="input-with-select"
              :disabled="isLogin"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="checked">
            <el-checkbox v-model="ruleForm.checked">
              <p class="checked-text">
                {{ $t('Login.我已阅读并同意') }}
                <a @click="openLink(Link.Privacy)">《{{ $t(`Login.${Link.privacy.label}`) }}》</a>{{ $t('Login.和') }}
                <a @click="openLink(Link.Agreement)">《{{ $t(`Login.${Link.agreement.label}`) }}》</a>
              </p>
            </el-checkbox>
          </el-form-item>
          <el-form-item class="login-btn">
            <button class="btn btn-primary" @click.prevent="submitForm(ruleFormRef)" v-if="isLogin">
              {{ $t('Login.登录当前账号') }}
            </button>
            <button class="btn btn-primary" @click.prevent="submitForm(ruleFormRef)" v-else>
              {{ $t('Login.登录') }}
            </button>
          </el-form-item>
        </el-form>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, ref, reactive, defineComponent, toRefs, onBeforeMount } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useI18nLocale } from '../TUIKit/TUIPlugin/TUIi18n';

import Header from '../components/Header.vue';
import { switchTitle } from '../utils/switchTitle';
import Link from '../assets/link';
import { genTestUserSig, EXPIRETIME } from '../TUIKit/debug/index';
import { SDKAppID, secretKey } from '../main';

export default defineComponent({
  components: {
    Header,
  },
  setup() {
    const instance = getCurrentInstance();
    const router = useRouter();

    const TUIKit: any = instance?.appContext.config.globalProperties.$TUIKit;

    const { t } = TUIKit.config.i18n.useI18n();

    const ruleFormRef = ref<FormInstance>();
    const locale = useI18nLocale();

    const store = useStore();

    onBeforeMount(async () => {
      if (TUIKit.isSDKReady) {
        await TUIKit.logout();
      }
    });

    const change = (value: any) => {
      if (locale.value !== value) {
        locale.value = value;
        switchTitle(locale.value);
      }
    };

    const validateUserID = (rule: any, value: any, callback: any) => {
      // const reg = new RegExp('^1[0-9]{10}$', 'gi');
      if (!rule.required) {
        callback();
      } else if (!value) {
        callback(new Error(t('Login.请输入userID')));
      } else {
        callback();
      }
    };

    const validateChecked = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error(t('Login.请先勾选用户协议')));
      } else {
        callback();
      }
    };

    const data = reactive({
      ruleForm: {
        checked: true,
        userID: '',
      },
      rules: {
        checked: [{ required: true, validator: validateChecked, trigger: 'change' }],
        userID: [{ required: true, validator: validateUserID, trigger: 'blur' }],
      },
      isLogin: false,
      env: TUIKit.TUIEnv,
    });

    if (localStorage.getItem('TUIKit-userInfo')) {
      const storgeUserInfo = localStorage.getItem('TUIKit-userInfo') || '';
      const userInfo = JSON.parse(storgeUserInfo);
      if (new Date(userInfo?.expire) > new Date()) {
        data.isLogin = true;
        data.ruleForm.userID = userInfo.userID || '';
      }
    }

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          const options = genTestUserSig({ SDKAppID, secretKey, userID: data.ruleForm.userID });
          const userInfo = {
            userID: data.ruleForm.userID,
            userSig: options.userSig,
          };
          login(userInfo);
        } else {
          return false;
        }
      });
    };

    const login = (userInfo: any) => {
      TUIKit.login(userInfo)
        .then((res: any) => {
          const options = {
            ...userInfo,
            expire: new Date().getTime() + EXPIRETIME * 1000,
          };
          store.commit('setUserInfo', options);
          router.push({ name: 'Home' });
        })
        .catch((error: any) => {
          ElMessage({
            message: error,
            grouping: true,
            type: 'error',
          });
        });
    };

    const exitLogin = async () => {
      localStorage.removeItem('TUIKit-userInfo');
      data.ruleForm.userID = '';
      data.isLogin = false;
    };

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const openLink = (type: any) => {
      window.open(type.url);
    };

    return {
      ...toRefs(data),
      ruleFormRef,
      change,
      submitForm,
      exitLogin,
      resetForm,
      locale,
      Link,
      openLink,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../styles/login.scss';
</style>
