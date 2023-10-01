<script setup>
import KulturLogo from '../assets/kultur_logo.jpg'
</script>

<template>
  <div>
    <div class="d-flex justify-center">
      <v-avatar size="220" class="mt-10">
        <v-img :src="KulturLogo" alt="Kultur">
        </v-img>
      </v-avatar>
    </div>
    <label class="d-flex justify-center">
      @Kulturmedieval
    </label>
    <small class="d-flex justify-center">Agrupación Histórica Militar</small>
    <div class="mt-3">
      <v-btn block color="#3A3A3A" href="mailto:kulturmedieval@gmail.com">Correo</v-btn>
      <v-btn block color="#3A3A3A" href="https://m.facebook.com/kulturmedieval">Facebook</v-btn>
      <v-btn block color="#3A3A3A" href="https://instagram.com/kulturmedieval?igshid=YmMyMTA2M2Y=">Instagram</v-btn>
    </div>
  </div>
</template>

<style scoped></style>
