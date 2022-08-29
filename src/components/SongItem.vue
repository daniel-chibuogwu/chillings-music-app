<template>
  <li
    class="flex hover:text-green-300 text-[#106666] justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-[#041827] border-b-2 border-b-[#041827]"
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docID } }"
        class="font-bold block hover:text-green-300"
        >{{ song.modified_name }}</router-link
      >
      <span class="text-gray-500 text-sm">{{ song.display_name }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <span class="comments">
        <i class="fa fa-comments text-gray-600"></i>
        {{ song.comment_count }}
      </span>
    </div>
  </li>
</template>

<script>
export default {
  name: "SongItem",
  props: ["song"],
};
</script>
