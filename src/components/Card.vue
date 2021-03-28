<template>
  <div :class="[$style.cardContainer, { 'bg--red': dob.age < 21, 'bg--green': (dob.age >= 21 && dob.age < 56), 'bg--blue': dob.age >= 56  }]">
    <div :class="$style.cardHeader">
      <div :class="$style.cardImage">
        <img :src="avatar.large" alt="">
      </div>
      <div :class="$style.cardImageText">
        <p>{{ name.title }} {{ name.first }} {{ name.last }}</p>
        <p>{{ dob.age }}</p>
        <p class="m--only" :class="$style.textElipsis">{{ email }}</p>
      </div>
    </div>
    <div class="cardBody">
      <h4 class="mb--1">{{ location.city }}, {{ location.state }}, {{ location.postcode }}</h4>
      <h4 class="d--only"><a :href="`mailto:${email}`">{{ email }}</a></h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    avatar: {
      type: Object,
      required: true
    },
    name: {
      type: Object,
      required: true
    },
    dob: {
      type: Object,
      required: true
    },
    registered: {
      type: Object,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    location: {
      type: Object,
      required: true
    }
  }
}
</script>

<style module>
  .cardContainer {
    width: 350px;
    border-radius: 2px;
    padding: 15px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 8%), 0 0 1px rgb(1 0 0 / 10%);
    color: #fff;
  }

  .cardContainer a {
    color: #fff;
  }

  .cardImage {
    max-width: 127px;
    margin: 0 auto;
  }

  .textElipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .cardHeader {
      display: flex;
    }

    .cardImage {
      margin-right: 15px;
      flex: 1;
      max-width: 50%;
    }

    .cardImageText {
      flex: 1;
      max-width: 50%;
    }

    .cardContainer {
      width: 100%;
      margin-bottom: 20px;
    }
  }
</style>