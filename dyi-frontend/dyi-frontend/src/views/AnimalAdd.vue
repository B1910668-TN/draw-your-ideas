<template>
    <div v-if="animal" class="page">
        <h4>Thêm động vật</h4>
        <AnimalForm 
            :animal="animal" 
            @submit:animal="onUpdateAnimal" 
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import AnimalForm from '@/components/AnimalForm.vue';
import { animalService } from '@/services/animal.service';
export default {
    components: {
        AnimalForm,
    },
    props: {
        animalId: { type: Number, required: true },
    },
    data() {
        return {
            animal: null,
            message: '',
        };
    },
    methods: {

        async onUpdateAnimal(animal) {
            try {
                await animalService.create(animal);
                this.message = 'Động vật được thêm thành công!';
            } catch (error) {
                console.log(error);
            }
        },
        
    },
    created() {
        this.animal ={
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