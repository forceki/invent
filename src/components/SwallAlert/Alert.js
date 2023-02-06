import Swal from "sweetalert2"

export const SuccessSwal = (title,text) => {
    Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        confirmButtonColor: '#3085d6',
    })

    return true
}

export const FailledSwal = (title,text) =>{
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
      })
    return true
}


export const deleteConfirmSwal = async (title,text) => {
    const result = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yaa!',
    }).then((res)=>{
       return res
    })

    return result
}