<script lang="ts">
  // ---------------------------------------------------------
  //  Imports
  // ---------------------------------------------------------
  import { goto } from '@roxi/routify'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faStar } from '@fortawesome/free-solid-svg-icons';
  import { createEventDispatcher } from 'svelte';
  import { formatDate } from '@/libs/utils'
  import { addToast } from "@/libs/store";
  // ---------------------------------------------------------
  //  Props
  // ---------------------------------------------------------
  export let id: number
  export let title: string
  export let content: string
  export let date: string
  export let isFavorite: boolean
  export let tags: string[]
  // ---------------------------------------------------------
  //  Methods Declarations
  // ---------------------------------------------------------
  const dispatch = createEventDispatcher();
  /**
   * Trim the content if longer than 100 characters and add ellipsis
   *
   * @param {String} content
   */
  const trimContent = (content: string) => {
    if (content.length > 100) {
      return `${content.substring(0, 100)}...`
    }
    return content
  }
  const addFav = (id, isFavorite) => {
    if (id) {
      dispatch('toggleFavorite', id)
      const dataToast = {
        message: 'Se elimino de favoritos',
        type: 'success',
        dismissible: true,
      }
      !isFavorite && (dataToast.message = 'Se añadio a favoritos')
      addToast(dataToast)
    }
  }
  const searchTag = (tag) => {
    $goto('/Home', {tag: `${tag}`})
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="note-card" on:click>
  <div class="title">{title}</div>
  <div class="preview">{trimContent(content)}</div>

  <div class="tag-wrapper">
  {#each tags as tag (tag)}
    <div class="tag" on:click|stopPropagation="{() => searchTag(tag)}">
      <p>{tag}</p>
    </div>
  {/each}
  </div>

  <div class="card-footer">
    <div class="date">{formatDate(date)}</div>
    <div class="fav-icon" on:click|stopPropagation="{() => addFav(id, isFavorite)}">
      <Fa icon={faStar} color="{isFavorite ? '#ffda00' : '#afaeae'}"  
      />
    </div>
  </div>
</div>

<style lang="scss">
  .note-card {
    width: 200px;
    height: 250px;
    margin: 15px;
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
    display: grid;
    grid-template-rows: 1fr 4fr 2fr 1fr;
    .title {
      font-weight: bold;
      margin-bottom: 10px;
    }
    .preview {
      font-size: 15px;
      word-break: break-word;
    }
    .tag {
      background-color: #d6d2d2;
      padding: 0px 10px;
      border-radius: 20px;
      font-size: 12px;
      margin-right: 5px;
      height: 15px;
      cursor: pointer;
      p {
        margin: auto;
      }
      &-wrapper {
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        height: fit-content;
        margin-top: auto;
      }
    }
    @media (prefers-color-scheme: dark) {
      .tag {
        background-color: #013148;
      }
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .date {
        color: #afaeae;
        font-size: 14px;
      }
    }
  }
  .fav-icon {
    cursor: pointer;
  }
  @media (prefers-color-scheme: dark) {
    .note-card {
      background-color: #1F6072;
    }
  }
</style>