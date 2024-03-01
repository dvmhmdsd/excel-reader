export default function Upload() {
  const dispatchUploadEvent = () => {
    window.electron.ipcRenderer.sendMessage('save-users');
  };

  return (
    <div className="centered-container">
      <button onClick={dispatchUploadEvent} type="button">
        تحميل
      </button>
    </div>
  );
}
