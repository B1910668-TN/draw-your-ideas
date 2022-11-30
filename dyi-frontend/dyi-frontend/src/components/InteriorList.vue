<script>
    export default {
        props: {
            interiors: { type: Array, default: () => [] },
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
            v-for="(interior, index) in interiors"
            :key="interior.id"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >
            {{ interior.name }}
        </li>
    </ul>
</template>