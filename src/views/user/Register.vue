<template>
  <div>
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card class="mt-3" header="用户注册">
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="input-group-2" label="用户名:" label-for="input-2">
              <b-form-input
                id="input-2"
                type="text"
                v-model="form.name"
                placeholder="请输入：用户名"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="手机号:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                type="number"
                :max="999999999999"
                v-model="$v.form.telephone.$model"
                placeholder="请输入：手机号"
                :state="validateState('telephone')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('telephone')">
                手机号不符合要求
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="input-group-3" label="密码:" label-for="input-3">
              <b-form-input
                id="input-3"
                type="password"
                v-model="$v.form.password.$model"
                placeholder="请输入：密码"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须大于等于 6 位
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="input-group-4" label="确认密码:" label-for="input-4">
              <b-form-input
                id="input-4"
                type="password"
                v-model="$v.form.repwd.$model"
                placeholder="确认密码"
                :state="validateState('repwd')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('repwd')">
                重复密码不一致
              </b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" variant="outline-primary" block>注册</b-button>
          </b-form>
          <a @click="$router.push({'name': 'Login'})"
             style="display:block;margin-top: 10px;text-align: center;cursor:pointer">登录</a>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {
    required, minLength, maxLength, sameAs
  } from 'vuelidate/lib/validators'
  import customValidator from '@/util/validator'
  import { mapActions } from 'vuex'

  export default {
    name: 'Register',
    data() {
      return {
        form: {
          telephone: '',
          name: '',
          repwd: '',
          password: ''
        }
      }
    },
    validations: {
      form: {
        telephone: {
          required,
          telephone: customValidator.telephoneValidator
        },
        password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(18)
        },
        repwd: {
          required,
          minLength: minLength(6),
          sameAsPassword: sameAs('password')
        }
      }
    },
    methods: {
      ...mapActions('user', 'Register'),
      validateState(name) {
        const { $dirty, $error } = this.$v.form[name]
        return $dirty ? !$error : null
      },
      onSubmit(event) {
        this.$v.$touch()
        if (this.$v.form.$anyError) {
          return
        }
        event.preventDefault()
        this.Register(this.form)
          .then((res) => this.RegisterSuccess(res))
          .catch((err) => this.requestFailed(err))
          .finally(() => {
            this.loginBtn = false
          })
      },
      RegisterSuccess(res) {
        console.log(res)
        const id = 'register_toast'
        this.$bvToast.toast(res.msg, {
          id,
          autoHideDelay: 2000,
          title: '注册成功',
          variant: 'success',
          solid: true
        })
        setTimeout(() => {
          this.$bvToast.hide(id)
          this.$router.push({ name: 'Home' })
        }, 2000)
      },
      requestFailed(error) {
        console.log(error)
        this.$bvToast.toast(error.msg, {
          title: '操作失败',
          variant: 'success',
          solid: true,
          autoHideDelay: 1000
        })
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style scoped>

</style>
