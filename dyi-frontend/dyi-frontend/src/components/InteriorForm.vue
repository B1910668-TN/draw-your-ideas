<template>
    <Form @submit="submitInterior" :validation-schema="interiorFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="interiorLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="type">Loại</label>
            <Field name="type" as="select" class="form-control" v-model="interiorLocal.type">
                    <option value="ban">Bàn</option>
                    <option value="ghe">Ghế</option>
                    <option value="tu">Tủ</option>
                    <option value="den">Đèn</option>
                    <option value="khac">Khác</option>
            </Field>
            <ErrorMessage name="story" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author">Người thêm</label>
            <Field name="author" type="text" class="form-control" v-model="interiorLocal.author" />
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
    emits: ['submit:interior', 'delete:interior'],
    props: {
        interior: { type: Object, required: true }
    },
    data() {
        const interiorFormSchema = yup.object().shape({
            name: yup
                .string()
                .required('Tên phải có giá trị.')
                .min(1, 'Tên phải ít nhất 1 ký tự.')
                .max(50, 'Tên có nhiều nhất 50 ký tự.'),
            author: yup
                .string()
                .max(255, 'Tối đa 255 ký tự'),
        });
        return {
            // Props are supposed to be immutable, therefore create
            // a local variable contactLocal and bind it to the form
            interiorLocal: {
                ...this.interior
            },
            interiorFormSchema,
        };
    },
    methods: {
        submitInterior() {
            this.$emit('submit:interior', this.interiorLocal);
        },
        deleteInterior() {
            this.$emit('delete:interior', this.interiorLocal.id);
        },
    },
};
</script>
<style scoped>
@import '@/assets/form.css';
</style>