<template>
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>

</template>
<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
export default {
    components: {
        "vue-form-generator": VueFormGenerator.component
    }
};
</script>