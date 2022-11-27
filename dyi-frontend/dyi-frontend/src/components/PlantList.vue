<script>
    export default {
        props: {
            plants: { type: Array, default: () => [] },
            activeIndex: { type: Number, default: -1 },
        },
        emits: ['update:activeIndex'],
        methods: {
            updateActiveIndex(index) {
                this.$emit('update:activeIndex', index);
            },
        },
    };
</script>
<template>
    <ul class="list-group plant-list">
        <li
            class="list-group-item"
            v-for="(plant, index) in plants"
            :key="plant.id"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >
            {{ plant.name }}
        </li>
    </ul>
</template>