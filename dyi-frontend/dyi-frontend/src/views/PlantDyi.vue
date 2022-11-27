<template>
    <h1>Thực vật</h1>
    <div class="page row">
        <div class="col-sm-7 page-input">
            <InputSearch v-model="searchText"/>
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh sách thực vật
            </h4>
            <PlantList
                v-if="filteredPlantsCount > 0"
                :plants="filteredPlants"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>
                Không có thực vật nào @-@
            </p>

            <div class="mt-3 row justify-content-around align-items-center test">
                <button
                    class="btn btn-sm btn-primary"
                    @click="refreshList()"
                >
                    <i class="fas fa-redo"/>Làm mới
                </button>
                <button
                    class="btn btn-sm btn-success"
                    @click="goToAddPlant"
                >
                    <i class="fas fa-plus"/>Thêm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activePlant" class="detail-plant">
                <h4>
                    Chi tiết thực vật
                </h4>
                <PlantCard :plant="activePlant"/>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from '@/components/InputSearch.vue';
import PlantList from '@/components/PlantList.vue';
import PlantCard from '@/components/PlantCard.vue';
import { plantService } from '@/services/plant.service';

    export default{
        components:{
            InputSearch,
            PlantList,
            PlantCard
        },

        data(){
            return{
                plants:[],
                activeIndex: -1,
                searchText: '',
            };
        },

        watch:{
            searchText(){
                this.activeIndex = -1;
            },
        },

        computed:{
            plantsAsStrings(){
                return this.plants.map((plant) => {
                    const {name, mean, story, type, author} = plant;
                    return [name, mean, story, type, author].join('');
                });
            },

            //Return plants filtered by the search box
            filteredPlants(){
                if(!this.searchText) return this.plants;
                return this.plants.filter((plant, index) => 
                    this.plantsAsStrings[index].includes(this.searchText)
                );
            },

            activePlant(){
                if(this.activeIndex < 0) return null;
                return this.filteredPlants[this.activeIndex];
            },

            filteredPlantsCount(){
                return this.filteredPlants.length;
            },
        },

        methods:{
            async retrievePlants(){
                try{
                    const plantsList = await plantService.getMany();
                    this.plants = plantsList.sort((current, next) =>
                        current.name.localeCompare(next.name)
                    );
                }catch(error){
                    console.log(error);
                }
            },

            refreshList(){
                this.retrievePlants();
                this.activeIndex = -1;
            },

            goToAddPlant(){
                this.$router.push({name: 'plant.add'});
            },
        },
        mounted(){
            this.refreshList();
        },  
    };

</script>

<style>
    h1{
        color: black;
        font-family:Arial, Helvetica, sans-serif;
    }
</style>