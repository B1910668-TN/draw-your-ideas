<script>
export default {
    props: {
        interior: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ interior.name }}
        </div>
        <div class="p-1">
            <strong>Loại:</strong>
            {{ interior.type }}
        </div>
        <div class="p-1">
            <strong>Người thêm:</strong>
            {{ interior.author }}
        </div>
    </div>
</template>