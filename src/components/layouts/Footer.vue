<script setup>
</script>

<template>
<footer id="main-footer" class="pd1">
    <div >
        <i class="fa-solid fa-tree f075"></i>
        <span class="signature f075"> © 2024 The Heart Gathering. All rights reserved.</span>
    </div>
    <span class="signature-i f075">Made with ❤️ by <a href="https://github.com/vital-xvv/">Vital</a></span>
</footer>
    
</template>


<style scoped>
span, div {
    background-color: var(--darker-neutral-color);
}

#main-footer {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.12);
    background-color: var(--darker-neutral-color);
}

@media screen and (max-width: 425px) {
    .signature, .signature-i {
        font-size: 0.5rem;
    }
}
</style>