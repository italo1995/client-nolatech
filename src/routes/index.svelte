<script lang="ts">
  import Login from "@/routes/Auth/Login.svelte";
  import Home from "./Home.svelte";
  import { User } from "@/libs/user";

  User.authenticate();
</script>

<style>
</style>

{#if !$User}
  <Login />
{:else}
 <Home />
{/if}