<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let visible = false;
  export let components: any = undefined
  const handlePopoverUser = () => {
    console.log('click')
    visible = !visible;
  }
</script>

{#if visible}
  <div
    role="dialog"
    aria-labelledby="Title"
    aria-describedby="Description"
    transition:fade
    class="popover"
    >
    <!-- aria-orientation="vertical" -->
    <div
      on:keydown|stopPropagation={handlePopoverUser}
      transition:scale={{ delay: 25, duration: 150, easing: quintOut }}
      class="backdrop"
    />
    <div class="wrapper">{components}</div>
  </div>
{/if}

<style>
  .popover {
    position: fixed;
    inset: 0;

    z-index: 997;
  }

  .backdrop {
    position: absolute;
    inset: 0;

    background: rgba(0, 0, 0, 0.3);
  }

  .wrapper {
    position: absolute;

    min-width: 200px;
    max-width: 200px;

    min-height: 100px;

    width: fit-content;
    height: auto;

    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    background: white;
    color: black;
  }
</style>