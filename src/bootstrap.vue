<script>
/**
* Bootstrap JavaScript + CSS imports
*
* Try to only include what is strictly needed to keep package size down
*/

// import 'bootstrap/js/dist/alert';
// import 'bootstrap/js/dist/button';
// import 'bootstrap/js/dist/carousel';
// import 'bootstrap/js/dist/collapse';
// import 'bootstrap/js/dist/dropdown';
// import Modal from 'bootstrap/js/dist/modal'; // Handled by vm.$prompt
// import 'bootstrap/js/dist/offcanvas';
// import 'bootstrap/js/dist/popover';
// import 'bootstrap/js/dist/scrollspy';
// import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/toast'; // Handled by vm.$toast
// import 'bootstrap/js/dist/tooltip'; // Handled by v-tooltip
</script>

<style lang="scss">
/* Import + mutate Bootstrap as per https://getbootstrap.com/docs/5.0/customize/sass/#variable-defaults */
/* The following sequence should mirror bootstrap/scss/bootstrap.scss */
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";

/* Bootstrap SCSS modules {{{ */
/* The following sequence should mirror bootstrap/scss/bootstrap.scss for opt-in modules */
@import "bootstrap/scss/utilities/api"; /* Needed for spacing utilities */

/* Opt-in bootstrap modules, listed in full with CURRENTLY unused items commented out - re-enable these if needed */
@import "bootstrap/scss/root";
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/type";
/* @import "bootstrap/scss/images"; */
/* @import "bootstrap/scss/containers"; */
/* @import "bootstrap/scss/grid"; */
/* @import "bootstrap/scss/tables"; */
/* @import "bootstrap/scss/forms"; */
/* @import "bootstrap/scss/buttons"; */
/* @import "bootstrap/scss/transitions"; */
/* @import "bootstrap/scss/dropdown"; */
/* @import "bootstrap/scss/button-group"; */
/* @import "bootstrap/scss/nav"; */
/* @import "bootstrap/scss/navbar"; */
/* @import "bootstrap/scss/card"; */
/* @import "bootstrap/scss/accordion"; */
/* @import "bootstrap/scss/breadcrumb"; */
/* @import "bootstrap/scss/pagination"; */
/* @import "bootstrap/scss/badge"; */
/* @import "bootstrap/scss/alert"; */
/* @import "bootstrap/scss/progress"; */
/* @import "bootstrap/scss/list-group"; */
/* @import "bootstrap/scss/close"; */
/* @import "bootstrap/scss/toasts"; */
/* @import "bootstrap/scss/modal"; */
/* @import "bootstrap/scss/tooltip"; */
/* @import "bootstrap/scss/popover"; */
/* @import "bootstrap/scss/carousel"; */
/* @import "bootstrap/scss/spinners"; */
/* @import "bootstrap/scss/offcanvas"; */
/* @import "bootstrap/scss/helpers"; */
/* }}} */
</style>
