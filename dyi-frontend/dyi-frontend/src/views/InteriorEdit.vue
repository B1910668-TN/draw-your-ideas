<template>
    <div v-if="interior" class="page">
        <h4>Chỉnh sửa</h4>
        <InteriorForm :interior="interior" @submit:interior="onUpdateInterior" @delete:interior="onDeleteInterior" />
        <p>{{ message }}</p>
    </div>

</template>
<script>
import InteriorForm from '@/components/InteriorForm.vue';
import { interiorService } from '@/services/interior.service';
export default {
    components: {
        InteriorForm,
    },
    props: {
        interiorId: { type: Number, required: true },
    },
    data() {
        return {
            interior: null,
            message: '',
        };
    },
    methods: {
        async getInterior(id) {
            try {
                this.interior = await interiorService.get(id);
            } catch (error) {
                console.log(error);
                // Redirect to NotFound page and keep URL intact
                this.$router.push({
                    name: 'notfound',
                    params: {
                        pathMatch: this.$route.path.split('/').slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async onUpdateInterior(interior) {
            try {
                await interiorService.update(interior.id, interior);
                this.message = 'Nội thất đã được cập nhật thành công.';
            } catch (error) {
                console.log(error);
            }
        },
        async onDeleteInterior(id) {
            if (confirm('Bạn muốn xóa nội thất này?')) {
                try {
                    await interiorService.delete(id);
                    this.$router.push({ name: 'InteriorDyi' });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getInterior(this.interiorId);
        this.message = '';
    },
};
</script>

<style>
@import '@/assets/home.css';
</style>