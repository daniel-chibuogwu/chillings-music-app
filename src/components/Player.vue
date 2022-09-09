<template>
  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-black/50 px-4 py-2 w-full">
    <!-- Track Info -->
    <div class="text-center text-cyan-900">
      <span class="song-title font-bold">Song Title</span> by
      <span class="song-artist">Artist</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center text-green-500">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio">
        <i
          class="fa text-green-500 text-xl"
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          style="left: 50%"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          style="width: 50%"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import usePlayerStore from "@/stores/player";

export default {
  name: "PlayerComponent",
  computed: {
    ...mapState(usePlayerStore, ["playing", "duration", "seek"]),
  },
  methods: {
    ...mapActions(usePlayerStore, ["toggleAudio"]),
  },
};
</script>
