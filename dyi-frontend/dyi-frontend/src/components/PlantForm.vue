<template>
    <Form @submit="submitPlant" :validation-schema="plantFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="plantLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="mean">Ý nghĩa</label>
            <Field name="mean" type="text" class="form-control" v-model="plantLocal.mean" />
            <ErrorMessage name="mean" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="story">Câu chuyện</label>
            <Field name="story" type="text" class="form-control" v-model="plantLocal.story" />
            <ErrorMessage name="story" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="type">Loại</label>
            <Field name="type" as="select" class="form-control" v-model="plantLocal.type">
                    <option value="hoa">Loài hoa</option>
                    <option value="traicay">Trái cây</option>
                    <option value="loaicu">Loại củ</option>
                    <option value="khac">Khác</option>
            </Field>
            <ErrorMessage name="story" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author">Người thêm</label>
            <Field name="author" type="text" class="form-control" v-model="plantLocal.author" />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button class="ml-2 btn btn-danger">
                <a @click="$router.go(-1)">Quay lại</a>
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ['submit:plant', 'delete:plant'],
    props: {
        plant: { type: Object, required: true }
    },
    data() {
        const plantFormSchema = yup.object().shape({
            name: yup
                .string()
                .required('Tên phải có giá trị.')
                .min(1, 'Tên phải ít nhất 1 ký tự.')
                .max(50, 'Tên có nhiều nhất 50 ký tự.'),
            mean: yup
                .string()
                .max(255, 'Tối đa 255 ký tự'),
            story: yup
                .string()
                .max(255, 'Tối đa 255 ký tự'),    
            type: yup
                .string(),
            author: yup
                .string()
                .max(255, 'Tối đa 255 ký tự'),
        });
        return {
            // Props are supposed to be immutable, therefore create
            // a local variable contactLocal and bind it to the form
            plantLocal: {
                ...this.plant
            },
            plantFormSchema,
        };
    },
    methods: {
        submitPlant() {
            this.$emit('submit:plant', this.plantLocal);
        },
        deletePlant() {
            this.$emit('delete:plant', this.plantLocal.id);
        },
    },
};
</script>
<style scoped>
@import '@/assets/form.css';
</style>