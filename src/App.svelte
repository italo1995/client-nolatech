<script context="module">
    import { Router, createRouter, goto } from '@roxi/routify'
    import { onMount } from "svelte";
    import routes from '../.routify/routes.default.js'
    import Toasts from "@/components/Toast/Toasts.svelte";
    import Header from '@/components/Header.svelte'
    import { User } from "@/libs/user";
    import '@/style/global.scss'
    import { Styles } from 'sveltestrap';
    import { getSocket } from "@/libs/ws"
    const router = createRouter({ routes })
</script>
<script lang="ts">
  onMount(async () => {
    getSocket();
  })
  User.authenticate();
  const pag = window.location.pathname
  const origin = window.location.origin
  if (!$User && pag !== '/' && pag !== 'index') {
    $goto(origin)
  }
  if ($User && (pag === '/' || pag === 'login')) {
    $goto(`${origin}/Home`)
  }
</script>
<Header />

<Router {router} />
<Toasts/>
<Styles/>
  