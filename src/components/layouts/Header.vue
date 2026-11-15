<script setup>
</script>

<template>
    <header id="main-header">
        <div class="header-logo">
            <div class="icon-frame"><i id="fire-icon" class="fa-sharp fa-solid fa-fire"/></div>
            <div id="logo-text">
                <h3>The Heart<br/>Gathering</h3>
                <span class="signature-i">Annual Retreat</span>
            </div>
        </div>

        <div class="container page-select">
            <button class="button">Event Overview</button>
            <!-- <button class="button">Contact</button> -->
            <button class="button google"><img class="svg" src="@/assets/google-icon.svg" alt="Google" width="24" height="24"/>Sign in with Google</button>
        </div>
        <div class="icon-frame"><i class="fa-solid fa-circle-user"/></div>
    </header>
</template>


<style scoped>

#main-header {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
    justify-content: space-around;
}

.container {
    padding: 0.25rem;
}

#main-header, .header-logo {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    position: sticky;
    top: 0;
    z-index: 1;
}

.header-logo {
    gap: 1rem;
    justify-content: flex-start;
}

#fire-icon {
    color: #b81515;
}

#logo-text {
    display: flex;
    flex-direction: column;
}

.page-select {
    gap: 1rem
}

div.icon-frame i {
    font-size: 2rem;
    color: var(--primary-color)
}

.google {
    border-radius: 24px;
}

@media screen and (max-width: 425px) {
    h3, span {
        font-size: 0.75rem;
    }

    .button {
        padding: 0.5rem;
        gap: 0.5rem;
        font-size: 0.5rem;
    }

    #main-header {
        padding: 0;
    }

    #fire-icon {
        font-size: 1.5rem;
        padding: 0.5rem;
    }

    .header-logo {
        gap: 0.2rem;
        padding: 0;
    }

    .signature-i {
        font-size: 0.5rem;
    }
}

</style>