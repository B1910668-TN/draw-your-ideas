<template>
    <div v-if="interior" class="page">
        <h4>Thêm nội thất</h4>
        <InteriorForm 
            :interior="interior" 
            @submit:interior="onUpdateInterior" 
        />
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

        async onUpdateInterior(interior) {
            try {
                await interiorService.create(interior);
                this.message = 'Nội thất được thêm thành công!';
            } catch (error) {
                console.log(error);
            }
        },
        
    },
    created() {
        this.interior ={
            name: '',
            type: 'khac',
            author: 'Không có'
        };
        this.message = '';
    },
};
</script>