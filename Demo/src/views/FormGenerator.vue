<template>
    <div>
        {{model}}
        <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";

export default {
    components: {
        VueFormGenerator
    },
    data() {
        return {
            schema: {
                fields: [
                    {
                        type: "input",
                        inputType: "text",
                        label: "Name",
                        model: "name",
                        placeholder: "Your name",
                        required: true,
                    },
                    {
                        type: "input",
                        inputType: "email",
                        label: "Email",
                        model: "email",
                        placeholder: "Your email",
                        required: true,
                    },
                ],
            },
            model: {
                name: "1",
                email: "2",
            },
            formOptions: {
                validateAfterLoad: true,
            },
        };
    },
};
</script>