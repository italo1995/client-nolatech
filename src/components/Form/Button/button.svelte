<script lang="ts">
  export let btnActive: boolean = false;
  export let btnLoading: boolean = false;
  export let btnError: boolean = false;
  export let text: string = 'Go';
  export let size: string = 'natural';
</script>
<button class="btn {size}" class:active={btnActive} class:loading={btnLoading} class:error={btnError} disabled="{$$props.disabled}"><span>{text}</span>
  <svg class="active" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 415.582 415.582" xml:space="preserve">
    <path d="M411.47,96.426l-46.319-46.32c-5.482-5.482-14.371-5.482-19.853,0L152.348,243.058l-82.066-82.064
      c-5.48-5.482-14.37-5.482-19.851,0l-46.319,46.32c-5.482,5.481-5.482,14.37,0,19.852l138.311,138.31
      c2.741,2.742,6.334,4.112,9.926,4.112c3.593,0,7.186-1.37,9.926-4.112L411.47,116.277c2.633-2.632,4.111-6.203,4.111-9.925
      C415.582,102.628,414.103,99.059,411.47,96.426z"/>
  </svg>
  <svg class="loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" fill="none" stroke="#fff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
    </circle>
  </svg>
  <svg class="error" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
    <defs>
    </defs>
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
      <path d="M 11 90 c -2.815 0 -5.63 -1.074 -7.778 -3.222 c -4.295 -4.296 -4.295 -11.261 0 -15.557 l 68 -68 c 4.297 -4.296 11.26 -4.296 15.557 0 c 4.296 4.296 4.296 11.261 0 15.557 l -68 68 C 16.63 88.926 13.815 90 11 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
      <path d="M 79 90 c -2.815 0 -5.63 -1.074 -7.778 -3.222 l -68 -68 c -4.295 -4.296 -4.295 -11.261 0 -15.557 c 4.296 -4.296 11.261 -4.296 15.557 0 l 68 68 c 4.296 4.296 4.296 11.261 0 15.557 C 84.63 88.926 81.815 90 79 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
    </g>
  </svg>
</button>
<style lang="scss">
  button {
      font-family: sans-serif, Arial;
      &:focus, &:active {
          outline: none;
      }
  }
  .btn {
    opacity: 0;
    transition: all 0.3s cubic-bezier(.48,.55,.69,.9);
    transform: translate(0px, 20px);
    transition-delay: 0.25s;
  }
  .btn {
    border-radius: 10px;
    visibility: visible;
    opacity: 1;
    transform: translate(0px, 0px);
  }
  .btn {
    transition: all 0.6s ease;
    background-color: transparent;
    // background-color: var(--btn-bg);
    border: 3px solid var(--btn-color);
    cursor: pointer;
    color: var(--btn-color);
    display: block;
    text-align: center;
    min-width: 130px;
    height: 50px;
    line-height: 50px;
    font-size: 23px;
    font-weight: bold;
    text-transform: uppercase;
    overflow: hidden;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    span {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    svg {
      fill: var(--btn-active-color);
      width: 35px;
      height: 35px;
      position: absolute;
      left: 50%;
      top: 50%;
      opacity: 0;
      transition: all 0.35s cubic-bezier(.48,.55,.69,1.11);
      transform: translate(-50%, -50%) rotate(-90deg) skew(18deg,12deg);
    }
    &:hover {
      border-color: var(--btn-active);
      color: var(--btn-active);
    }
  }
  .active {
    color: var(--btn-active-color);
    background-color: var(--btn-active);
    border-color: var(--btn-active);
    span {
      visibility: hidden;
    }
    svg.active {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg) skew(0deg, 0deg);
    }
  }
  .loading {
    color: var(--btn-active-color);
    background-color: var(--btn-loading);
    border-color: var(--btn-loading);
    span {
      visibility: hidden;
    }
    svg.loading {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg) skew(0deg, 0deg);
    }
  }
  .error {
    color: var(--btn-active-color);
    background-color: var(--btn-error);
    border-color: var(--btn-error);
    span {
      visibility: hidden;
    }
    svg.error {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg) skew(0deg, 0deg);
    }
  }
  button.btn:disabled {
    cursor: no-drop !important;
    border-color: var(--btn-error);
    color: var(--btn-error);
  }
  .btn.min {
    font-size: 16px;
    height: 18px;
    line-height: 18px;

  }
</style>