<script lang="ts">
  import { onMount } from "svelte";
  import { Col, Container, ListGroup, ListGroupItem, Row, Spinner, Button as Btsvelte } from 'sveltestrap';
  import request from "@/libs/request";
  import { addToast } from "@/libs/store";
  import { User } from '@/libs/user';
  import Input from '@/components/Form/Inpust/input.svelte'
  import Button from '@/components/Form/Button/button.svelte'

  let listClient: { users: any[], totalPages: number, totalUsers: number } = { users: [], totalPages: 0, totalUsers: 0 };
  let userEdit: any
  let loading = true;
  let error: string | null = null;
  let currentPage = 1;
  let btnActive = false
  let btnLoading = false
  let btnError = false
  const itemsPerPage = 10;

  async function listsUsers(page = 1) {
    const rq = new request();
    try {
      const resp = await rq.get(`users?page=${page}&count=${itemsPerPage}`);
      console.log('resp :>> ', resp);
      listClient = resp;
      return listClient
    } catch (err) {
      error = "Error fetching users";
    } finally {
      loading = false;
    }
  }

  const activeBtn =() => {
    if (!btnActive) {
      btnActive = true
      setTimeout(() => {
        btnActive = false
      }, 1000);
    }
  }

  const errorBtn =() => {
    if (!btnError) {
      btnError = true
      setTimeout(() => {
        btnError = false
      }, 1000);
    }
  }

  onMount(() => {
    listsUsers();
  });

  const editUser = async (key: any) => {
    console.log("Edit user:", key);
    const rq = new request();
    userEdit = await rq.get(`users/${key}`);
  };
  const updateUser = async (e: any) => {
    btnLoading = true
    const formData = new FormData(e.target);
    const rq = new request()
    const resp = await rq.pacth(`users/${userEdit.key}`, formData)
    console.log('resp :>> ', resp);
    btnLoading = false
    if (resp.status) {
      activeBtn()
      const dataToast = {
        message: `Registrado con exitoso`,
        type: 'success',
        dismissible: true,
      }
      addToast(dataToast)
      userEdit = {
        name: null,
        email: null,
        lastName: null,
        user: null
      }
      listsUsers(currentPage)
    } else {
      const dataToast = {
        message: resp.data.message,
        type: 'error',
        dismissible: true,
      }
      addToast(dataToast)
      errorBtn()
    }
  };

  const deleteUser = async (key: any) => {
    try {
      const rq = new request();
      const resp = await rq.delete(`users/${key}`);
      if (!resp) {
        let dataToast = {
          message: `Ocurrio un error`,
          type: 'error',
          dismissible: true,
        };
        addToast(dataToast);
      }
      await listsUsers(currentPage);
    } catch (err) {
      console.log('err :>> ', err);
      let dataToast = {
          message: `Ocurrio un error`,
          type: 'error',
          dismissible: true,
        };
        addToast(dataToast);
    }
  };

  const changePage = (page: number) => {
    currentPage = page;
    listsUsers(page);
  };

</script>
<Container>
  <Row class="mt-4">
    <Col xs="4" sm="4" class="col">
      <div class="userList">
        <div class="d-flex justify-content-between align-items-center">
          <h1>Usuarios</h1>
          <Btsvelte color="secondary" size="sm" on:click={() => listsUsers(currentPage)}>Reload</Btsvelte>
        </div>
        {#await listsUsers(currentPage)}
          <Spinner/>
        {:then lists}
        {#if lists && lists.users.length}
          <ListGroup>
            {#each lists.users as list}
              <ListGroupItem class="d-flex justify-content-between align-items-center">
                <span class="user-name">{list.email}</span>
                <div>
                  <Btsvelte color="primary" size="sm" class="ml-2" on:click={() => editUser(list.key)}>
                    <!-- <FaEdit /> -->
                     Editar
                  </Btsvelte>
                  <Btsvelte color="danger" size="sm" class="ml-2" disabled={$User.key === list.key} on:click={() => deleteUser(list.key)}>
                    <!-- <FaTrash /> -->
                    Borrar
                  </Btsvelte>
                </div>
              </ListGroupItem>
            {/each}
          </ListGroup>
          <div class="pagination">
            <Btsvelte color="secondary" size="sm" on:click={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</Btsvelte>
            <span>Page {currentPage}</span>
            <Btsvelte color="secondary" disabled={currentPage > lists.totalPages} size="sm" on:click={() => changePage(currentPage + 1)}>Next {lists.totalPages}</Btsvelte>
          </div>
        {:else}
          <p>No users found.</p>
        {/if}
        {:catch error}
          <p>Ocurrió un error: {error}</p>
        {/await}
      </div>
    </Col>
    <Col xs="8" sm="8" class="col">
      <div class="userList">
        <h1>Editar</h1>
        <div>
          <form class="form" on:submit|preventDefault={updateUser}>
            <Input type="text" name="name" value={userEdit?.name || null} label="Nombre" placeholder="Jhon" />
            <Input type="text" name="lastName" value={userEdit?.lastName || null} label="Apellido" placeholder="Doe" />
            <Input type="email" name="email" value={userEdit?.email || null} label="email" placeholder="example@mail.com" />
            <Input type="user" name="user" value={userEdit?.user || null} label="Usuario" placeholder="example@mail.com" />
            <Button text="Guardar" btnActive="{btnActive}" btnLoading="{btnLoading}" btnError="{btnError}"/>
          </form>
        </div>
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
  .user-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }
</style>
