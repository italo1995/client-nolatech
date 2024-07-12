<script lang="ts">
  import { User } from "@/libs/user";
  import request from "@/libs/request";
  import { addToast } from "@/libs/store";
  import Input from '@/components/Form/Inpust/input.svelte'
  import Button from '@/components/Form/Button/button.svelte'
  let levelLogin = true
  let levelRegRevers = false
  let levelReg = false
  let levelForget = false
  let hiddenRegTAg = false

  let btnActive = false
  let btnLoading = false
  let btnError = false
  let password: any = ''
  let repeatPassword: any = ''
  const handleSubmit = (dataUser, token) => {
    User.login(dataUser, token);
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
  const Login = async (e) => {
    try {
      const formData = new FormData(e.target);
      const rq = new request()
      btnLoading = true
      const resp = await rq.post('auth/login', formData)
      console.log(resp)
      btnLoading = false
      if (resp.status) {
        activeBtn()
        const dataToast = {
          message: `Login exitoso`,
          type: 'success',
          dismissible: true,
        }
        addToast(dataToast)
        handleSubmit(resp.data.user, resp.data.token)
      } else {
        if (resp.data.user === null) {
          const dataToast = {
          message: `Error en datos del usuario`,
          type: 'error',
          dismissible: true,
        }
        addToast(dataToast)
        }
      }
    } catch (error) {
      errorBtn()
    }
  }
  const register = async (e) => {
    console.log('e.target :>> ', e.target);
    btnLoading = true
    const formData = new FormData(e.target);
    formData.delete('repeatPassword');
    const rq = new request()
    const resp = await rq.post('auth/register', formData)
    btnLoading = false
    console.log('resp :>> ', resp);
    if (resp.status) {
      activeBtn()
      const dataToast = {
        message: `Registrado con exitoso`,
        type: 'success',
        dismissible: true,
      }
      addToast(dataToast)
      handleSubmit(resp.data, resp.data.token)
    } else {
      const dataToast = {
        message: resp.data.message,
        type: 'error',
        dismissible: true,
      }
      addToast(dataToast)
      errorBtn()
    }
  }
  const goRegTag = () => {
    levelRegRevers = !levelRegRevers
    levelLogin = !levelLogin
    levelForget = false
  }
  const goResetTag = (type) => {
    levelRegRevers = false
    levelLogin = type ? false : true
    levelForget = type
    hiddenRegTAg = type
  }
  // const passwordCorrect = () => {
  //   return repeatPassword.length > 3 && password !== repeatPassword
  // }
</script>

<div class="container">
  <div class="formBox" class:level-login={levelLogin} 
    class:level-reg-revers={levelRegRevers} 
    class:level-reg={levelReg}
    class:level-forget={levelForget}
    >
    <div class="box boxShaddow"></div>
    <div class="box loginBox">
      <h2>LOGIN</h2>
      <form class="form" on:submit|preventDefault={Login}>
        <Input type="text" name="email" label="Correo o usuario" placeholder="example@mail.com" />
        <Input type="password" name="password" label="Contraseña" placeholder="******" />
        <Button text="Go" btnActive="{btnActive}" btnLoading="{btnLoading}" btnError="{btnError}"/>
        <div class="f_link">
          <!-- <a href="/" on:click|preventDefault={() => goResetTag(true)} class="resetTag">Forgot your password?</a> -->
        </div>
      </form>
    </div>
    <div class="box forgetbox">
      <a href="/" on:click|preventDefault={() => goResetTag(false)} class="back icon-back">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 199.404 199.404" style="enable-background:new 0 0 199.404 199.404;" xml:space="preserve">
	      <polygon points="199.404,81.529 74.742,81.529 127.987,28.285 99.701,0 0,99.702 99.701,199.404 127.987,171.119 74.742,117.876 199.404,117.876 "/>
      </svg>
      </a>
      <h2>Reset Password</h2>
      <form class="form">
        <p>Por favor escribe tu email</p>
        <Input type="email" name="email" label="email" placeholder="example@mail.com" />
        <Button text="Reset" btnActive="{btnActive}" btnLoading="{btnLoading}" btnError="{btnError}"/>
      </form>
    </div>
    <div class="box registerBox">
      <div class="box boxShaddow"></div>
      <span class="reg_bg"></span>
      <h2>Register</h2>
      <form class="form" on:submit|preventDefault={register}>
        <Input type="text" name="name" label="Nombre" placeholder="Jhon" />
        <Input type="text" name="lastName" label="Apellido" placeholder="Doe" />
        <Input type="email" name="email" label="email" placeholder="example@mail.com" />
        <Input type="user" name="user" label="Usuario" placeholder="example@mail.com" />
        <Input type="password" name="password" bind:value={password} label="password" placeholder="******" />
        <Input type="password" name="repeatPassword" bind:value={repeatPassword} label="repetir password" placeholder="******" />
        {#if repeatPassword.length > 3 && password !== repeatPassword}
          <p class="notPassword">Las contraseñas deben ser iguales</p>
        {/if}
        {#if password.length < 3}
          <p class="notPassword">La contraseña debe tener al menos 3 caracteres</p>
        {/if}
        <Button text="Next" btnActive="{btnActive}" btnLoading="{btnLoading}" btnError="{btnError}" disabled="{repeatPassword.length > 3 && password !== repeatPassword}"/>
      </form>
    </div>
    <button class="regTag icon-add" hidden={hiddenRegTAg} on:click="{() => goRegTag() }">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve">
        <path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"/>
      </svg>
    </button>
  </div>
</div>

<style lang="scss">
  button {
      font-family: sans-serif, Arial;
      &:focus, &:active {
          outline: none;
      }
  }
  a {
      text-decoration: none;
      &:focus, &:active {
          outline: none;
      }
  }
  h2 {
      font-weight: bold;
      letter-spacing: 1px;
  }
  .container {
      height: 100%;
      width: 100%;
      position: relative;
      text-align: center;
      &:before {
          content: '';
          height: 100%;
          width: 0px;
          display: inline-block;
          vertical-align: middle;
      }
  }
  .box {
    z-index: -1;
  }
  .formBox {
      width: 460px;
      max-width: 100%;
      height: 650px;
      margin-left: -4px;
      margin-top: 50px;
      margin-bottom: 40px;
      position: relative;
      vertical-align: middle;
      display: inline-block;
      .box {
          text-align: left;
          background-color: #fff;
          border-radius: 8px; 
          padding: 60px 0px 40px 0;
          position: absolute;
          width: 100%;
          height: 100%;
          box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.5);
          transition: all 0.2s cubic-bezier(.35,.33,.75,.9);
      }
      h2 {
          border-left: 6px solid var(--title-h2); 
          color: var(--title-h2);
          padding: 0px 45px;
          font-size: 32px;
          line-height: 45px;
          height: 45px;
          text-transform: uppercase;
          margin-bottom: 30px;
          position: relative;
      }
      p {
          font-size: 18px;
          line-height: 27px;
          margin-bottom: 30px;
          color: var(--text-color);
      }
      form {
          display: block;
          padding: 0px 50px;
          position: relative;
      }
      .reg_bg {
          border-radius: 50%;
          background-color: #7DC6DC;
          position: absolute;
          width: 900px;
          height: 900px;
          right: -115px;
          top: -190px;
          transform-origin: 100% 40%;
          transform: scale(0);
      }
      .regTag {
          line-height: 140px;
          box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.45);
          border-radius: 50%;
          background-color: #9b4dca;
          color: #fff;
          font-size: 58px;
          text-align: center;
          width: 140px;
          height: 140px;
          position: absolute;
          right: -70px;
          top: 40px;
          z-index: 2;
          svg {
            fill: #fff;
            width: 38px;
            height: 38px;
          }
      }
      .registerBox {
          border-radius: 8px;
          background-color: #fff;
          right: 0;
          overflow: hidden;
          width: 100%;
          opacity: 0;
          visibility: hidden;
          backface-visibility: visible;
          z-index: 1;
          h2 {
              visibility: hidden;
              opacity: 0;
              transition: all 0.3s cubic-bezier(.48,.55,.69,.9);
              transform: translateX(-20px);
          }
          .form > div {
              visibility: hidden;
              opacity: 0;
              transition: all 0.3s cubic-bezier(.48,.55,.69,.9);
              transform: translateX(20px);
              &:nth-child(1) {
                  transition-delay: 0.15s;
              }
              &:nth-child(2) {
                  transition-delay: 0.2s;
              }
              &:nth-child(3) {
                transition-delay: 0.25s;
              }
          }
      }
      .forgetbox {
          background-color: #ffffff;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          transform: translate(0px, 9px) scale(1.03);
          .back {
              position: absolute;
              top: 13px;
              left: 26px;
              color: var(--text-color);
              font-size: 32px;
              font-weight: bold;
              animation: back 0.8s linear;
              animation-iteration-count: infinite;
              svg {
                fill: var(--text-color);
                width: 20px;
                height: 20px;
              }
          }
          h2 {
              color: var(--title-h2);
              border-left-color: var(--title-h2);
              visibility: hidden;
              opacity: 0;
              transition: all 0.3s cubic-bezier(.48,.55,.69,.9);
              transform: translate(-20px, 0px);
          }
          .form > div {
              visibility: hidden;
              opacity: 0;
              transition: all 0.3s cubic-bezier(.48,.55,.69,.9);
              transform: translate(0px, 20px);
              transition-delay: 0.15s;
          }
          p {
              color: var(--text-color);
              visibility: hidden;
              opacity: 0;
              transition: all 0.3s cubic-bezier(.48,.55,.69,.9);
              transform: translate(0px, 20px);
              transition-delay: 0.2s;
          }
      }
      &.level-login {
        .loginBox {
          &.box {
            z-index: 1;
          }
        }
        .boxShaddow {
            opacity: 0.7;
            transform-origin: center top;
            transform: translate(0px, -9px) scale(0.97);
        }
      }
      &.level-reg {
        .boxShaddow {
          opacity: 0.7;
          transform-origin: center top;
          transform: translate(0px, -18px) scale(0.94);
        }
        .loginBox {
          opacity: 0.7;
          transform-origin: center top;
          transform: translate(0px, -9px) scale(0.97);
        }
        .registerBox {
          opacity: 1;
          visibility: visible;
          h2 {
            transform: none;
          }
        }
        .regTag {
          animation: regTag 0.3s cubic-bezier(.48,.55,.73,.78), regTag2 0.3s cubic-bezier(.48,.55,.73,.78);
          animation-fill-mode: forwards; 
          //animation-direction: reverse;
        }
        .reg_bg {
          animation: regMask 0.3s cubic-bezier(.48,.55,.73,.78);
          animation-fill-mode: forwards; 
        }
        .form > div, h2 {
          visibility: visible;
          opacity: 1;
          transform: translateX(0px);
        }
      }
      &.level-reg-revers {
        .regTag {
          animation: regTagR 0.3s cubic-bezier(.48,.55,.73,.78), regTag2R 0.3s cubic-bezier(.48,.55,.73,.78);
          animation-fill-mode: forwards; 
        }
        .reg_bg {
          animation: regMaskR 0.3s cubic-bezier(.48,.55,.73,.78);
          animation-fill-mode: forwards; 
        }
        .registerBox {
          visibility: visible !important;
          opacity: 1 !important;
          &.box {
            z-index: 1;
          }
          * {
            visibility: visible !important;
            opacity: 1 !important;
          }
          h2 {
            transform: none;
          }
        }
        .boxShaddow {
          display: none;
        }
      }
      &.level-forget {
        .boxShaddow {
          opacity: 0.7;
          transform-origin: center top;
          transform: translate(0px, -18px) scale(0.94);
        }
        .loginBox {
          opacity: 0.7;
          transform-origin: center top;
          transform: translate(0px, -9px) scale(0.97);
        }
        .forgetbox {
          transform: translate(0px, 0px) scale(1);
          opacity: 1;
          &.box {
            z-index: 1;
          }
          visibility: visible;
          p, form > div, h2 {
            visibility: visible;
            opacity: 1;
            transform: translate(0px, 0px);
          }
        }
      }
  }
  @keyframes back {
      0% { transform: translateX(0px); }
      70% { transform: translateX(-13px); }
      100% { transform: translateX(0px); }
  }
  @keyframes regMask {
      0% { transform: translate(0px, 0px) scale(0); }
      50% { transform: translate(100px, 100px) scale(0.5); }
      100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes regMaskR {
      0% { transform: translate(0px, 0px) scale(1); }
      50% { transform: translate(150px, -150px) scale(0.5); }
      100% { transform: translate(0px, 0px) scale(0); }
  }
  @keyframes regTag {
      0% { transform: translate(0px, 0px) rotate(0deg); }
      25% { transform: translate(4px, 25px) rotate(11.25deg); }
      50% { transform: translate(-88px, 40px) rotate(22.5deg); }
      100% { transform: translate(-96px, 8px) rotate(45deg); }
  }
  @keyframes regTag2 {
      0% { width: 140px;height: 140px;line-height: 140px;box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.45); }
      100% { width: 70px;height: 70px;box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0);line-height: 68px; }
  }
  @keyframes regTagR {
      0% { transform: translate(-96px, 8px) rotate(45deg); }
      25% { transform: translate(-88px, 40px) rotate(22.5deg); }
      50% { transform: translate(4px, 25px) rotate(11.25deg); }
      100% { transform: translate(0px, 0px) rotate(0deg); }
  }
  @keyframes regTag2R {
      0% { width: 70px;height: 70px;box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0);line-height: 68px; }
      100% { width: 140px;height: 140px;line-height: 140px;box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.45); }
  }
  @keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
  }
  .f_link {
      text-align: center;
      padding-top: 50px;
      /*a {
          color: #bdbdbd;
          font-size: 23px;
          transition: all 0.6s ease;
          &:hover {
              color: #56ADC7;
          }
      }*/
  }
  p.notPassword {
    font-size: 16px;
    color: var(--btn-error);
    margin: 0;
    text-align: center;
  }
</style>