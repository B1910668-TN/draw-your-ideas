<script>
export default {
    props: {
        animal: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ animal.name }}
        </div>
        <div class="p-1">
            <strong>Ý nghĩa:</strong>
            {{ animal.mean }}
        </div>
        <div class="p-1">
            <strong>Câu chuyện:</strong>
            {{ animal.story }}
        </div>
        <div class="p-1">
            <strong>Loại:</strong>
            {{ animal.type }}
        </div>
        <div class="p-1">
            <strong>Người thêm:</strong>
            {{ animal.author }}
        </div>
    </div>
</template>