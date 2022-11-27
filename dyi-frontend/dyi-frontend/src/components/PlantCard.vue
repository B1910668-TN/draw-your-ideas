<script>
export default {
    props: {
        plant: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ plant.name }}
        </div>
        <div class="p-1">
            <strong>Ý nghĩa:</strong>
            {{ plant.mean }}
        </div>
        <div class="p-1">
            <strong>Câu chuyện:</strong>
            {{ plant.story }}
        </div>
        <div class="p-1">
            <strong>Loại:</strong>
            {{ plant.type }}
        </div>
        <div class="p-1">
            <strong>Người thêm</strong>
            {{ plant.author }}
        </div>
    </div>
</template>