import { defineStore } from 'pinia'
import { reactive } from '@vue/reactivity';
import createToast from '../components/Toaster'
import { useLayoutStore } from "./layout";
import { toRaw } from 'vue';
//@ts-ignore
import moment from "moment";
import Swal from 'sweetalert2';
import { apiService } from '../utils';

export const useDashboardStore = defineStore('dashboard', () => {

    const LAYOUT = useLayoutStore()

    const FORM = reactive({
        sp_nomor: '',
        nama: ''
    })

    const DATAS = reactive ({
        total_rekening: 0,
        kode_terpakai: 0,
        kode_takterpakai: 0,
        sp_hari: 0,
        sp_bulan: 0,
        sp_takterbit: 0,
        total_nasabah: 0,
        total_sp: 0,
        nasabah: []
    })

    const CHART = reactive({
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Total Reasuransi per Bulan'
                }
            }
        },
        data: {
            labels: ['January', 'February', 'March', 'April', 'Mei'],
            datasets: [{
                label: 'Reas Penjaminan', 
                data: [40, 20, 12, 56, 10, 52],
                backgroundColor: '#40B782' 
            }, {
                label: 'Reas IJP', 
                data: [30, 40, 12, 75, 56, 24],
                backgroundColor: '#197BEF'
            }]
        },
    })

    const DISPLAY = reactive({
        loading: false
    })

    //API Services
    const getAllDatas = async () => {
        try {
            const response = await apiService.byGetData('/dashboard', null)
            if(!response.data) throw new Error("Error from server");
            Object.keys(DATAS).forEach(a => {
                if (Object.keys(response.data.data).includes(a)) {
                    DATAS[a] = response.data.data[a]    
                    return
                }
            })
            DISPLAY.loading = false
            console.log(DATAS)
        } catch (error) {
            DISPLAY.loading = false
            console.log(error)
        }
    }
    
    const getNasabah = async () => {
        if (FORM.nama || FORM.sp_nomor) {
            LAYOUT.absoluteLoading = true
            LAYOUT.loadingStatement = 'Menjemput data.'
            const response = await apiService.byGetData('/dashboard-nasabah', toRaw(FORM))
            DATAS.nasabah = response.data.data.data
            LAYOUT.absoluteLoading = false
        }
    }

    const ifLoad = () => FORM.sp_nomor || FORM.nama

    const checkToast = (type: any) => {
        createToast({
            message: 'TESTER',
            duration: 5000,
            type: type
        })
    }

    return {
        FORM,
        DATAS,
        CHART,
        DISPLAY,
        getAllDatas,
        getNasabah,
        ifLoad,
        checkToast
        }
})