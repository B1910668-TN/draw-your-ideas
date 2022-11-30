<template>
    <div v-if="animal" class="page">
        <h4>Chỉnh sửa</h4>
        <AnimalForm :animal="animal" @submit:animal="onUpdateAnimal" @delete:animal="onDeleteAnimal" />
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
        async getAnimal(id) {
            try {
                this.animal = await animalService.get(id);
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
        async onUpdateAnimal(animal) {
            try {
                await animalService.update(animal.id, animal);
                this.message = 'Động vật đã được cập nhật thành công.';
            } catch (error) {
                console.log(error);
            }
        },
        async onDeleteAnimal(id) {
            if (confirm('Bạn muốn xóa động vật này?')) {
                try {
                    await animalService.delete(id);
                    this.$router.push({ name: 'AnimalDyi' });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getAnimal(this.animalId);
        this.message = '';
    },
};
</script>

<style>
@import '@/assets/home.css';
</style>