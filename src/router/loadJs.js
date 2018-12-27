function loadJs() {
 return require.context('./module',true,/\.js$/)
}

export default loadJs;
