
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // Invoke Methods
    testInvoke: (args) => ipcRenderer.invoke('test-invoke', args),
    // Send Methods
    testSend: (args) => ipcRenderer.send('test-send', args),
    // Receive Methods
    testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) }),
    getNextRef: (args) => ipcRenderer.invoke('get-nextref',args),
    addEntry: (args) => ipcRenderer.invoke('addEntry', args),
    getAllEntries : (args)=>ipcRenderer.invoke('getAllEntries',args),
    getEntrybyRef: (args) => ipcRenderer.invoke('getEntrybyRef', args),
    updateEntry: (args) => ipcRenderer.invoke('updateEntry', args),
    deleteEntry: (args) => ipcRenderer.invoke('deleteEntry', args),
    
});
// ipcRenderer.on('asynchronous-message', (event, data) => {
//     document.getElementById('log').insertAdjacentHTML('beforeend', data + "<br>");
// })