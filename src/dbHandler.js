const getNewRef = async ()=>{
const r = await window.api.getNextRef()

return r+1
}


const addEntry = async (values)=>{
    window.api.addEntry(values).then(()=>{console.log("added succesfully");})
}
const getAllEntries = async (from,to)=>{
   const entries = await window.api.getAllEntries([from,to])
   return entries
}

const getEntrybyRef = async(reference)=>{
    const entry = await window.api.getEntrybyRef([reference])
return entry
}
const updateEntry = async (values) => {

    window.api.updateEntry(values).then(() => { console.log("updated succesfully"); })
    .catch((err)=>{

        throw err
    })
}

const deleteEntry = async (reference) => {
    const status = await window.api.deleteEntry([reference])
    return status
}
export { getNewRef, addEntry, getAllEntries, getEntrybyRef,updateEntry,deleteEntry}