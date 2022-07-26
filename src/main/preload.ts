import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});

contextBridge.exposeInMainWorld('databaseAPI', {
  // Invoke Methods
  getUsers: () => ipcRenderer.invoke('get-users'),
  userRegister: (args: any) => ipcRenderer.invoke('user-register', args),
  checkUserExists: (args: any) => ipcRenderer.invoke('check-user-exists', args),

  // Recipe apis call
  saveRecipe: (args: any) => ipcRenderer.invoke('save-recipe', args),
  updateRecipe: (args: any) => ipcRenderer.invoke('update-recipe', args),
  isRecipeExists: (args: any) => ipcRenderer.invoke('is-recipe-exists', args),
  getAllRecipe: (args: any) => ipcRenderer.invoke('get-all-recipe', args),
  removeRecipe: (args: any) => ipcRenderer.invoke('remove-recipe', args),
  seedRecipe: (args: any) => ipcRenderer.invoke('seed-recipe', args),
  

  // Order apis call
  saveOrder: (args: any) => ipcRenderer.invoke('save-order', args),
  updateOrder: (args: any) => ipcRenderer.invoke('update-order', args),
  getAllOrder: (args: any) => ipcRenderer.invoke('get-all-order', args),

  getProfileInfo: (args: any) => ipcRenderer.invoke('get-profile-info', args),
});
