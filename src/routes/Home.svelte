<script lang="ts">
  import { onMount, beforeUpdate, onDestroy } from "svelte";
  import { Col, Container, ListGroup, ListGroupItem, Row, Spinner, Button } from 'sveltestrap';
  import { User } from "@/libs/user";
  import request from "@/libs/request";


  // let listClient: any  = []
  // $: listClient
  onMount(async () => {
    console.log('onMount');
	})
  const listsUsers = async () => {
    const rq = new request()
    const resp = await rq.get('user/all')
    console.log('resp :>> ', resp);
    console.log('resp :>> ', resp.users);
    return resp.users
  }
	// onDestroy(socketSubscribe);
  // beforeUpdate(() => {
  //   listsUsers()
  // })
  const editUser = (user: any) => {
    console.log("Edit user:", user);
    // Lógica para editar el usuario
  };

  const deleteUser = async (user: any) => {
    console.log("Delete user:", user);
    // Lógica para eliminar el usuario
    try {
      const rq = new request();
      await rq.delete(`user/${user.id}`);
      // Actualizar la lista de usuarios después de eliminar
      await listsUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  }
</script>
<Container>
  <Row class="mt-4">
    <Col xs="4" sm="4" class="col">
      <div class="userList">
        <div class="d-flex">
          <h1>Usuarios</h1>
          <!-- <button class="btn" on:click={() => {clientsEmit}}>reload</button> -->
        </div>
        {#await listsUsers()}
          <Spinner/>
        {:then lists}
        {#if lists.length}
          <ListGroup>
            {#each lists as list}
              <ListGroupItem>
                <div>
                  <p>
                    {list.name}
                  </p>
                  <Button color="primary" size="sm" class="ml-2" on:click={() => editUser(list.key)}>Editar</Button>
                  <Button color="danger" size="sm" class="ml-2" on:click={() => deleteUser(list.key)}>Eliminar</Button>
                </div>
              </ListGroupItem>
            {/each}
          </ListGroup>
        {/if}
        {:catch error}
          <p> Ocurrio un error: {error}</p>
        {/await}
      </div>
    </Col>
    <Col xs="8" sm="8" class="col">
      <div class="userList">
        <h1>Editar</h1>
      </div>
    </Col>
  </Row>
</Container>
<style lang="scss">
  .userList {
    width: 100%;
    height: 100%;
    background: rgb(173, 185, 201, .3);
    box-shadow: 2px 2px 4px rgb(173, 185, 201, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    max-height: 70vh;
    overflow: auto;
    h1 {
      font-size: 16px;
    }
  }
</style>