<script lang="ts">
  export let type: string = 'email';
  export let name: string = 'email';
  export let label: string = 'email';
  export let value: any = '';
  export let placeholder: any = '';
  const handleInput = (e: any) => {
    value = type.match(/^(number|range)$/)
      ? +e.target.value
      : e.target.value;
  };
</script>
<div class="f_row">
  <input id="{name}"
    name="{name}"
    type="{type}"
    minlength="3"
    maxlength="255"
    class="input-field"
    placeholder="{placeholder}"
    on:input={handleInput}
    required
  />
  <label for="{name}">{label}</label>
</div>
<style lang="scss">
  .f_row {
    position: relative;
    margin-bottom: 2rem;
    height: 5rem;
    input {
      font-family: sans-serif, Arial;
      &:focus, &:active {
        outline: none;
      }
    }
    label {
        color: #3f3f3fa1;
        font-size: 16px;
        font-weight: normal;
        position: absolute;
        left: 1rem;
        top: 10px;
        opacity: 1;
        transition: all 0.3s cubic-bezier(1,-0.33,0,1.15);
        transform: translate(0px, 0px) scale(1);
        transform-origin: left top;
    }
    input {
      background-color: transparent;
      border: none;
      color: #3f3f3fa1;
      font-size: 18px;
      width: 100%;
      height: 100%;
      position: relative;
      border: 1px solid #e1e1e1;
      border-bottom: 2px solid #e1e1e1;
    }
    input::placeholder {
      color: transparent;
      transition: .3s ease all;
      font-size: 16px;
    }
    input:focus::placeholder {
      color: #3f3f3fa1;
    }
    input.input-field:focus~label {
      // opacity: 0.5;
      // transform: translate(0px, -30px) scale(0.8);
      transform: translate(0px, -23px) scale(0.8);
      background: white;
      padding: 0.5rem;
    }
    input.input-field:valid~label {
      // opacity: 0.5;
      // transform: translate(0px, -30px) scale(0.8);
      transform: translate(0px, -23px) scale(0.8);
      background: white;
      padding: 0.5rem;
    }
    input.input-field:not(:placeholder-shown):invalid {
      border-color: #ed2553;
    }
    input.input-field:not(:placeholder-shown):invalid~label {
      // opacity: 0.5;
      transform: translate(0px, -23px) scale(0.8);
      color: red;
      background: white;
      padding: 0.5rem;
    }
  }
</style>