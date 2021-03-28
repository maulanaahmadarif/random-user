<template>
  <header class="pb--1 pt--1">
    <div class="container">
      <div class="row justify-content-between">
        <div :class="$style.headerLogo">
          <span class="logo">Qoala Test</span>
        </div>
        <div class="header-nav">
          <span class="mr--1">
            <Button text="Color" @click="sortByAge" />
          </span>
          <span>
            <Button text="Cities" @click="sortByCity" />
          </span>
        </div>
      </div>
    </div>
  </header>
  <div class="main">
    <div class="container" :class="$style.slideContainer">
      <div :class="$style.slideContent" ref="slideContainer">
        <div :class="$style.slideItem" v-for="(user, index) in users" :key="`user-${index}`">
          <Card
            :avatar="user.picture"
            :name="user.name"
            :dob="user.dob"
            :registered="user.registered"
            :email="user.email"
            :location="user.location"
          />
        </div>
      </div>
    </div>
  </div>
  <div :class="$style.loading"  v-if="isFetching">
    Loading
  </div>
</template>

<script>
import Button from '../components/Button'
import Card from '../components/Card'
import client from '../api/client'
import _debounce from 'lodash/debounce'

export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      limit: 10,
      users: [],
      renderedUser: [],
      isFetching: false
    }
  },
  components: {
    Button,
    Card
  },
  methods: {
    onScrollContainer(e) {
      if (this.page <= 9) {
        if (e.target.scrollLeft > (this.page * (350 * 6))) {
          this.page++
          this.setUserData(this.page)
        }
      }
    },
    setUsersLocalData(page, users = []) {
      window.localStorage.setItem('page', page)
      window.localStorage.setItem('users', JSON.stringify(users))
    },
    getUsersLocalData() {
      const page = window.localStorage.getItem('page')
      const users = window.localStorage.getItem('users')
      return {
        page: parseInt(page, 10),
        users: JSON.parse(users)
      }
    },
    onScrollWindow() {
      if (this.page <= 9) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          this.page++
          this.setUserData(this.page)
        }
      }
    },
    setUserData(page) {
      this.isFetching = true
      client.get(`/?results=${this.limit}&page=${page}`)
        .then((res) => {
          this.users = [...this.users, ...res.data.results]
          this.setUsersLocalData(this.page, this.users)
        })
        .finally(() => {
          this.isFetching = false
        })
    },
    sortByAge() {
      this.users.sort((a, b) => (a.dob.age > b.dob.age) ? 1 : -1)
    },
    sortByCity() {
      this.users.sort((a, b) => (a.location.city > b.location.city) ? 1 : -1)
    }
  },
  mounted() {
    const { users, page } = this.getUsersLocalData()
    if (page) {
      this.page = page
    }
    if (users) {
      this.users = users
    } else {
      this.setUserData(this.page)
    }

    if (window.innerWidth < 768) {
      window.addEventListener('scroll', _debounce(this.onScrollWindow, 100))
    } else {
      this.$refs.slideContainer.addEventListener('scroll', _debounce(this.onScrollContainer, 100))
    }
  }
}
</script>

<style module>
  .headerLogo {
    color: var(--orangeColor);
    font-weight: bold;
    font-size: 24px;
  }

  .slideContent {
    display: flex;
    overflow-x: scroll;
    padding: 3em 0;
  }

  .slideContentFetching {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
  }

  .slideContainer {
    position: relative;
  }

  .slideContainer::after, .slideContainer::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100%;
  }

  .slideContainer::after {
    top: 0;
    right: 0;
    background: linear-gradient(90deg,hsla(0,0%,100%,0) 0,#fff 90%,#fff);
  }

  .slideContainer::before {
    top: 0;
    left: 0;
    background: linear-gradient(270deg,hsla(0,0%,100%,0) 0,#fff 90%,#fff)
  }

  .slideItem {
    padding: 0 15px;
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .6);
    color: #fff;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    .slideContent {
      flex-flow: wrap;
    }

    .slideItem {
      width: 100%;
      max-width: 100%;
      flex: 1;
      padding-left: 0;
      padding-right: 0;
    }

    .slideContainer::after, .slideContainer::before {
      display: none;
    }
  }
</style>