import { reactive, ref } from "vue";

export const loadingConfig = reactive({
    isLoading: false,
    message: ""
});

export const startLoading = async (message = "Loading...") => {
    loadingConfig.isLoading = true;
    loadingConfig.message = message;
}

export const stopLoading = async () => {
    loadingConfig.isLoading = false;
}