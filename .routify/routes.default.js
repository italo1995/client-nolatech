

export default {
  "meta": {},
  "id": "_default",
  "_regex": {},
  "_paramKeys": {},
  "file": {
    "path": "src/routes",
    "dir": "src",
    "base": "routes",
    "ext": "",
    "name": "routes"
  },
  "rootName": "default",
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {},
      "id": "_default_Auth",
      "_regex": {},
      "_paramKeys": {},
      "name": "Auth",
      "module": false,
      "file": {
        "path": "src/routes/Auth",
        "dir": "src/routes",
        "base": "Auth",
        "ext": "",
        "name": "Auth"
      },
      "children": [
        {
          "meta": {},
          "id": "_default_Auth_Login_svelte",
          "_regex": {},
          "_paramKeys": {},
          "name": "Login",
          "file": {
            "path": "src/routes/Auth/Login.svelte",
            "dir": "src/routes/Auth",
            "base": "Login.svelte",
            "ext": ".svelte",
            "name": "Login"
          },
          "asyncModule": () => import('../src/routes/Auth/Login.svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {},
      "id": "_default_Home_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "Home",
      "file": {
        "path": "src/routes/Home.svelte",
        "dir": "src/routes",
        "base": "Home.svelte",
        "ext": ".svelte",
        "name": "Home"
      },
      "asyncModule": () => import('../src/routes/Home.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_Notes_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "Notes",
      "file": {
        "path": "src/routes/Notes.svelte",
        "dir": "src/routes",
        "base": "Notes.svelte",
        "ext": ".svelte",
        "name": "Notes"
      },
      "asyncModule": () => import('../src/routes/Notes.svelte'),
      "children": []
    },
    {
      "meta": {
        "fallback": true
      },
      "id": "_default__fallback_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "_fallback",
      "file": {
        "path": "src/routes/_fallback.svelte",
        "dir": "src/routes",
        "base": "_fallback.svelte",
        "ext": ".svelte",
        "name": "_fallback"
      },
      "asyncModule": () => import('../src/routes/_fallback.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default__layout_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "_layout",
      "file": {
        "path": "src/routes/_layout.svelte",
        "dir": "src/routes",
        "base": "_layout.svelte",
        "ext": ".svelte",
        "name": "_layout"
      },
      "asyncModule": () => import('../src/routes/_layout.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_index_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "index",
      "file": {
        "path": "src/routes/index.svelte",
        "dir": "src/routes",
        "base": "index.svelte",
        "ext": ".svelte",
        "name": "index"
      },
      "asyncModule": () => import('../src/routes/index.svelte'),
      "children": []
    },
    {
      "meta": {
        "dynamic": true,
        "dynamicSpread": true
      },
      "_regex": {},
      "_paramKeys": {},
      "name": "[...404]",
      "file": {
        "path": ".routify/components/[...404].svelte",
        "dir": ".routify/components",
        "base": "[...404].svelte",
        "ext": ".svelte",
        "name": "[...404]"
      },
      "asyncModule": () => import('./components/[...404].svelte'),
      "children": []
    }
  ]
}