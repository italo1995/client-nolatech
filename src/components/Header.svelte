<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import PopoverUser from '@/components/PopoverUser.svelte';
  import { User } from "@/libs/user";
  import { faUser } from '@fortawesome/free-solid-svg-icons'
  import logo from '@/assets/logo.svg'
  let show = false;
  let visiblePopover = false;
  const links = [
    {
      name: 'inicio',
      url: '/',
      path: '/'
    },
    {
      name: 'Home',
      url: '/Home',
      path: '/Home'
    },
  ]
  
  const handleBurger = () => {
    show = !show;
  }
  const handlePopoverUser = () => {
    visiblePopover = !visiblePopover;
  }
  const routeActive = (path) => {
    const pag = window.location.pathname
    return pag === path
  }
</script>

<header class="global-header">
  <aside>
    <img src={logo} alt="Svelte Logo" class="logo"/>
    <nav class="mobile-nav">
      <span class="burger" on:keypress={handleBurger}>☰</span>
      <span class="title">Routify Examples</span>
      <span />
    </nav>
    <nav class:show on:keypress={() => (show = false)}>
      {#each links as item}
        {#if item}
          <a class="link" class:active="{routeActive(item.path)}" href="{item.url}">
            {item.name}
          </a>
        {/if}
      {/each}
    </nav>
    {#if $User}
      <div class="fav-icon">
        <div on:click={handlePopoverUser} on:keyup={handlePopoverUser}>
          <Fa class="userIcon" icon={faUser} size="1.5x" />
        </div>
        <PopoverUser visible="{visiblePopover}" onChange={value => visiblePopover = value}/>
      </div>
    {/if}
  </aside>
</header>

<style lang="scss">
  .global-header {
    background-color: #313131;
    height: 56px;
    color: white;
    box-sizing: border-box;
    width: 100%;
    right: 0;
    top: 0;
  }
  aside {
    height: 100%;
    width: 100%;
    display: flex;
  }
  .logo {
    height: 100%;
    margin-right: 5px;
    padding: 15px;
  }
  nav {
    display: none;
    width: 100%;
    height: 100%;
    z-index: 1;
    .link {
      display: block;
      white-space: nowrap;
      border-radius: 4px;
      // box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.075);
      &.active {
        font-weight: bold;
        color: white;
      }
    }
    .title {
      top: 6px;
      left: 0;
      right: 0;
      text-align: center;
    }
    .burger {
      font-size: 24px;
      position: absolute;
      left: 8px;
      top: 4px;
    }
  }
  @media (min-width: 640px) {
    nav {
      // display: inline-block;
      // position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      width: auto;
      font-size: 16px;
      .link {
        padding: 5px 16px;
        min-width: 56px;
        display: inline-block;
        font-weight: bold;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        text-decoration: none;
      }
    }
  }
  nav.mobile-nav {
    font-size: 18px;
    background: white;
    padding: 8px;
    // box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.075);
    display: block;
    & * {
      vertical-align: middle;
    }
  }
  @media (min-width: 640px) {
    nav.mobile-nav {
      display: none;
    }
  }
  nav.show {
    display: block;
  }
  .fav-icon {
    margin: auto 0;
    margin-left: auto;
    margin-right: 2rem;
    cursor: pointer;
  }
</style>
