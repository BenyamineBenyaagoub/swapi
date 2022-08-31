<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Header.vue";
import CommonCard from "@/components/MoCommonCard.vue";
const a = "this is a title";
</script>

<template>
  <Header />
  <b-container>
    <RouterView />
    <MoCommonCard 
    title=a
    body="this is a body test"
    image="https://picsum.photos/600/300/?image=25"
     />
  </b-container>
</template>
