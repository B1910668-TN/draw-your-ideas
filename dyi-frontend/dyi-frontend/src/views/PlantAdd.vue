<template>
    <div v-if="plant" class="page">
        <h4>Thêm thực vật</h4>
        <PlantForm 
            :plant="plant" 
            @submit:plant="onUpdatePlant" 
        />
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

        async onUpdatePlant(plant) {
            try {
                await plantService.create(plant);
                this.message = 'Thực vật được thêm thành công!';
            } catch (error) {
                console.log(error);
            }
        },
        
    },
    created() {
        this.plant ={
            name: '',
            mean: 'Không có',
            story: 'Không có',
            type: 'khac',
            author: 'Không có'
        };
        this.message = '';
    },
};
</script>