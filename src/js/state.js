import {ref, reactive, computed} from 'vue';

export const isAuthenticated = ref(false);
export const userProfile = ref({});
export const currentPage = ref('overview');


const eventStatisticsDefaultForm = {
    name: "",
    capacity: 0,
    filledCapacity: 0,
    registeredVisitsCount: 0,
    filledPercentage: 0,
    isFull: true
}

const visitInfoDefaultForm = {
     note: "",
     companionship: "",
     companyCount: 0,
     status: "",
     registrationDate: null,
     event: null
}

export const eventStatistics = ref({...eventStatisticsDefaultForm})

export const clearEventStatistics = async () => {
    eventStatistics.value = {...eventStatisticsDefaultForm};
}

export const registration = reactive({
        firstName: "",
        lastName: "",
        email: "",
        companionship: "SINGLE",
        companionCount: 0,
        note: "",
        eventName: "Juleaften"
});

export const clearFormData = async () => {
    registration.firstName = ""
    registration.lastName= "";
    registration.email = "";
    registration.companionship = "SINGLE";
    registration.companionCount = 0;
    registration.note = "";
}


// Visit

export const visitInfo = ref({...visitInfoDefaultForm});

export const clearVisitInfo = async () => {
    visitInfo.value = {...visitInfoDefaultForm};
}

export const isVisitPresent = computed(() => Boolean(visitInfo.value?.status))

export const isEventStatisticsPresent = computed(() => eventStatistics.value.name !== "")


