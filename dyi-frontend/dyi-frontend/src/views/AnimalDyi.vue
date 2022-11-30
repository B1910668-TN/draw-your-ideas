<template>
    <h1>Động vật</h1>
    <div class="page row space">
        <div class="col-sm-7 page-input">
            <InputSearch v-model="searchText"/>
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh sách động vật
            </h4>
            <AnimalList
                v-if="filteredAnimalsCount > 0"
                :animals="filteredAnimals"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>
                Không có động vật nào @-@
            </p>

            <div class="mt-3 row justify-content-around align-items-center test">
                <button
                    class="btn btn-sm btn-primary"
                    @click="refreshList()"
                >
                    <i class="fas fa-redo"/>Làm mới
                </button>
                <router-link :to="{
                    name: 'animal.create',
                }">
                    <button class="btn btn-sm btn-success" @click="goToAddContact">
                        <i class="fas fa-plus" /> Thêm mới
                    </button>
                </router-link>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeAnimal" class="detail">
                <h4>
                    Chi tiết động vật
                </h4>
                <AnimalCard :animal="activeAnimal"/>
                <router-link
                    :to="{
                        name: 'animal.edit',
                        params: {id: activeAnimal.id},
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i>Chỉnh sửa</i>
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from '@/components/InputSearch.vue';
import AnimalList from '@/components/AnimalList.vue';
import AnimalCard from '@/components/AnimalCard.vue';
import { animalService } from '@/services/animal.service';

    export default{
        components:{
            InputSearch,
            AnimalList,
            AnimalCard
        },

        data(){
            return{
                animals:[],
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
            animalsAsStrings(){
                return this.animals.map((animal) => {
                    const {name, mean, story, type, author} = animal;
                    return [name, mean, story, type, author].join('');
                });
            },

            //Return animals filtered by the search box
            filteredAnimals(){
                if(!this.searchText) return this.animals;
                return this.animals.filter((animal, index) => 
                    this.animalsAsStrings[index].includes(this.searchText)
                );
            },

            activeAnimal(){
                if(this.activeIndex < 0) return null;
                return this.filteredAnimals[this.activeIndex];
            },

            filteredAnimalsCount(){
                return this.filteredAnimals.length;
            },
        },

        methods:{
            async retrieveAnimals(){
                try{
                    const animalsList = await animalService.getMany();
                    this.animals = animalsList.sort((current, next) =>
                        current.name.localeCompare(next.name)
                    );
                }catch(error){
                    console.log(error);
                }
            },

            refreshList(){
                this.retrieveAnimals();
                this.activeIndex = -1;
            },

            goToAddAnimal(){
                this.$router.push({name: 'animal.add'});
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