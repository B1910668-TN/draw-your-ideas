<template>
    <h1>Nội thất</h1>
    <div class="page row space">
        <div class="col-sm-7 page-input">
            <InputSearch v-model="searchText"/>
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh sách nội thất
            </h4>
            <InteriorList
                v-if="filteredInteriorsCount > 0"
                :interiors="filteredInteriors"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>
                Không có nội thất nào @-@
            </p>

            <div class="mt-3 row justify-content-around align-items-center test">
                <button
                    class="btn btn-sm btn-primary"
                    @click="refreshList()"
                >
                    <i class="fas fa-redo"/>Làm mới
                </button>
                <router-link :to="{
                    name: 'interior.create',
                }">
                    <button class="btn btn-sm btn-success" @click="goToAddContact">
                        <i class="fas fa-plus" /> Thêm mới
                    </button>
                </router-link>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeInterior" class="detail">
                <h4>
                    Chi tiết nội thất
                </h4>
                <InteriorCard :interior="activeInterior"/>
                <router-link
                    :to="{
                        name: 'interior.edit',
                        params: {id: activeInterior.id},
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
import InteriorList from '@/components/InteriorList.vue';
import InteriorCard from '@/components/InteriorCard.vue';
import { interiorService } from '@/services/interior.service';

    export default{
        components:{
            InputSearch,
            InteriorList,
            InteriorCard
        },

        data(){
            return{
                interiors:[],
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
            interiorsAsStrings(){
                return this.interiors.map((interior) => {
                    const {name, mean, story, type, author} = interior;
                    return [name, mean, story, type, author].join('');
                });
            },

            //Return interiors filtered by the search box
            filteredInteriors(){
                if(!this.searchText) return this.interiors;
                return this.interiors.filter((interior, index) => 
                    this.interiorsAsStrings[index].includes(this.searchText)
                );
            },

            activeInterior(){
                if(this.activeIndex < 0) return null;
                return this.filteredInteriors[this.activeIndex];
            },

            filteredInteriorsCount(){
                return this.filteredInteriors.length;
            },
        },

        methods:{
            async retrieveInteriors(){
                try{
                    const interiorsList = await interiorService.getMany();
                    this.interiors = interiorsList.sort((current, next) =>
                        current.name.localeCompare(next.name)
                    );
                }catch(error){
                    console.log(error);
                }
            },

            refreshList(){
                this.retrieveInteriors();
                this.activeIndex = -1;
            },

            goToAddInterior(){
                this.$router.push({name: 'interior.add'});
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