<template>
  <li
    class="flex text-gray-600 hover:text-green-400 justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-[#041827] border-b border-b-[#041827]"
  >
    <div>
      <a href="#" class="font-bold block">{{ song.modified_name }}</a>
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
