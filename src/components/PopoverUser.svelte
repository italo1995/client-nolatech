<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
  import { User } from '@/libs/user';
  export let visible = false;
  export let onChange
  const handlePopoverUser = () => {
    visible = !visible;
    onChange(visible)
    // $: onChange(visible)
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
      on:click={handlePopoverUser} on:keydown={handlePopoverUser}
      transition:scale={{ delay: 25, duration: 150, easing: quintOut }}
      class="backdrop"
    />
    <div class="wrapper">
      <div class="avatar"></div>
      <div class="dataUser">
        <p class="name">{$User.name}</p>
        <span class="cont-line">
          <p class="line">En linea</p>
          <Fa color="#5AD539" class="userIcon" icon={faCircleMinus} size="0.5x" />
        </span>
      </div>
      <div class="dataLevel">
        <p class="level">Level: {$User.level}</p>
        <p class="experience">Experiencia: {$User.experience}</p>
      </div>
      <!-- <button type="button" class="btn variant-filled">
        <span>(icon)</span>
        <span>Cerrar sesion</span>
      </button> -->
      <button type="button" class="m-auto mb-1 btn variant-filled">Cerrar sesion</button>
    </div>
  </div>
{/if}

<style lang="scss">
  .popover {
    position: fixed;
    inset: 0;
    z-index: 10;
  }

  .backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  .wrapper {
    position: absolute;
    min-height: 150px;
    width: 200px;
    height: auto;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: white;
    color: black;
    right: 2rem;
    left: auto;
    top: 7rem;
    z-index: 13;
    cursor: auto;
    border-radius: 5px;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: red;
      position: absolute;
      top: -30px;
      left: -30px;
    }
    .dataUser, .dataLevel {
      margin-left: calc(2rem + 40px);
      p {
        font-size: 12px;
        color: var(--text-color);
        margin: 0;
      }
    }
    .dataLevel {
      margin: 0;
      margin-top: auto;
      margin-bottom: 5rem;
      margin-left: 1rem;
    }
    .cont-line {
      display: flex;
      flex-direction: row;
      align-items: center;
      .line {
        margin-right: 1.5rem;
      }
    }
  }
</style>