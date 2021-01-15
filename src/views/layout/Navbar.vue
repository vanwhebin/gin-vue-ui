<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-container>
        <b-navbar-brand href="#">GIN-VUE</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="$router.push('Register')">注册</b-nav-item>
            <b-nav-item @click="$router.push('Login')">登录</b-nav-item>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown
              right
              v-if="userInfo"
            >
              <template slot="button-content">
                <em>{{userInfo.name}}</em>
              </template>
              <b-dropdown-item @click="$router.push({name: 'Profile'})">个人主页</b-dropdown-item>
              <b-dropdown-item @click="Logout">登出</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Navbar',
    computed: mapState({
      userInfo: (state) => state.user.info
    }),

    methods: mapActions('user', ['Logout'])
  }
</script>

<style scoped>

</style>
