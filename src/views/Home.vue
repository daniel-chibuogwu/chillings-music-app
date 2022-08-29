<template>
  <!-- Introduction -->
  <section class="mb-10 py-48 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/newbanner.jpeg)"
    >
      <div class="absolute inset-0 bg-black/60" />
    </div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Music is Life! So please listen to good ones.
        </p>
      </div>
    </div>
    <!--
    <img
      class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      src="assets/img/introduction-music.png"
    /> -->
  </section>

  <!-- Main Content -->
  <section class="container mx-auto">
    <div
      class="bg-[#01050b] rounded border border-[#0d555d] relative flex flex-col"
    >
      <div class="px-6 pt-6 pb-5 font-bold border-b border-[#0d555d]">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <SongItem v-for="song in songs" :key="song.docID" :song="song" />
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import { songsCollection } from "../includes/firebase";
import SongItem from "../components/SongItem.vue";

export default {
  name: "HomePage",
  components: { SongItem },
  data() {
    return {
      songs: [],
      maxPerPage: 16,
      pendingRequest: false,
    };
  },
  created() {
    this.getSongs();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;
      let snapshots;
      if (this.songs.length) {
        const lastDoc = await songsCollection // the returns a snapshot of the last document in the array so that we use in the startAfter() and because we don't have that.
          .doc(this.songs[this.songs.length - 1].docID) // remember that doc() returns just a single document reference and get() converts it to a snapshot.
          .get();
        snapshots = await songsCollection
          .orderBy("modified_name") // necessary to add this before using the startAfter();
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollection
          .orderBy("modified_name")
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });
      this.pendingRequest = false;
    },
  },
};
</script>
