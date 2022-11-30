<script>
    export default {
        props: {
            animals: { type: Array, default: () => [] },
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
    <ul class="list-group list">
        <li
            class="list-group-item"
            v-for="(animal, index) in animals"
            :key="animal.id"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >
            {{ animal.name }}
        </li>
    </ul>
</template>