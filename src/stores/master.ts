import axios from "axios"
import { SuccessSwal, FailledSwal } from '../components/SwallAlert/Alert'


export const getKategori = async() => {
    try {
        const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"kategori")
       
        return data.data.data        
    } catch (error) {
        FailledSwal("erorr!", error.response.data.message)
    }
}

export const getSupplier = async()=>{
    try {
        const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"supplier/master")

        return data.data.data
    } catch (error) {
        FailledSwal("erorr!", error.response.data.message)
    }
}

export const getMasterGudang = async()=>{
    try {
        const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"gudang/master")

        return data.data.data
    } catch (error) {
        FailledSwal("erorr!", error.response.data.message)
    }
}

export const getMasterItem = async()=>{
    try {
        const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"items/master")

        data.data.data.forEach(element => {
            element.qty = 0
        });

        return data.data.data
    } catch (error) {
        FailledSwal("erorr!", error.response.data.message)
    }
}


export const parse = (data) => {
    console.log(data)
    var message = []
    data.forEach(element => {
        message.push(element.Message)
    });

    return message
} 