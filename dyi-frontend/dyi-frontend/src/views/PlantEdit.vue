<template>
    <div v-if="plant" class="page">
        <h4>Chỉnh sửa</h4>
        <PlantForm :plant="plant" @submit:plant="onUpdatePlant" @delete:plant="onDeletePlant" />
        <p>{{ message }}</p>
    </div>

</template>
<script>
import PlantForm from '@/components/PlantForm.vue';
import { plantService } from '@/services/plant.service';
export default {
    components: {
        PlantForm,
    },
    props: {
        plantId: { type: Number, required: true },
    },
    data() {
        return {
            plant: null,
            message: '',
        };
    },
    methods: {
        async getPlant(id) {
            try {
                this.plant = await plantService.get(id);
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
        async onUpdatePlant(plant) {
            try {
                await plantService.update(plant.id, plant);
                this.message = 'Thực vật đã được cập nhật thành công.';
            } catch (error) {
                console.log(error);
            }
        },
        async onDeletePlant(id) {
            if (confirm('Bạn muốn xóa thực vật này?')) {
                try {
                    await plantService.delete(id);
                    this.$router.push({ name: 'PlantDyi' });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getPlant(this.plantId);
        this.message = '';
    },
};
</script>

<style>
@import '@/assets/home.css';
</style>