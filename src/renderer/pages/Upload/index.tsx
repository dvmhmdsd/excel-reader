export default function Upload() {
  const dispatchUploadEvent = () => {
    window.electron.ipcRenderer.sendMessage('save-users');
  };

  return (
    <button onClick={dispatchUploadEvent} type="button">
      Upload Data
    </button>
  );
}
