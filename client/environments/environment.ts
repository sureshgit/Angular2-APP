// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  nonauth:false,
  appUrl:"http://localhost:4200",
  stsURL:"https://localhost:44300",
  apiUrl: "https://api-bdps.gear.host/api/",
  //apiUrl: "http://localhost:62991/api/",
  //apiUrl: "http://localhost/api-ssapp/api/",      
  v1AppUrl:"https://localhost:44309",
  secureCookies:false
};
