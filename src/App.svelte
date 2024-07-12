<script context="module">
    import { Router, createRouter, goto } from '@roxi/routify'
    import { onMount } from "svelte";
    import routes from '../.routify/routes.default.js'
    import Toasts from "@/components/Toast/Toasts.svelte";
    import Header from '@/components/Header.svelte'
    import { User } from "@/libs/user";
    import '@/style/global.scss'
    import { Styles } from 'sveltestrap';
    const router = createRouter({ routes })
</script>
<script lang="ts">

let isAuthenticated = false;

  onMount(async () => {
    await User.authenticate();
    isAuthenticated = $User !== false;
    handleNavigation();
  });

  const pag = window.location.pathname;
  const origin = window.location.origin;

  function handleNavigation() {
    if (!isAuthenticated && pag !== '/' && pag !== 'index') {
      $goto(origin);
    }
    if (isAuthenticated && (pag === '/' || pag === 'login')) {
      $goto(`${origin}/Home`);
    }
  }
</script>
<Header />

<Router {router} />
<Toasts/>
<Styles/>
  