<template> 
    <div class="all">
        <div class="signup">
            <h1>Đăng ký</h1>
            <input type="text" autocomplete="off" placeholder="Tên đăng nhập">
            <input type="password" placeholder="Mật khẩu">
            <input type="password" placeholder="Nhập lại mật khẩu">
            <input type="email" placeholder="Email">
            <button>Xác nhận</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignUp'
}
</script>

<style>
@import '@/assets/signup.css';
</style>