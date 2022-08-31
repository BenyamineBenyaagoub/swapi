<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">SWAPI</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"><RouterLink to="/">Home</RouterLink></b-nav-item>
          <b-nav-item href="#"><RouterLink to="/people">People</RouterLink></b-nav-item>
          <b-nav-item href="#"><RouterLink to="/planets">Planets</RouterLink></b-nav-item>
          <b-nav-item href="#"><RouterLink to="/starships">Starships</RouterLink></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
