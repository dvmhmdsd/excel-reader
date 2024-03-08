import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const navigate = useNavigate();
  const dispatchUploadEvent = () => {
    window.electron.ipcRenderer.sendMessage('save-users');
  };

  useEffect(() => {
    window.electron.ipcRenderer.on('users-saved', () => {
      navigate('/');
    });
  });

  return (
    <div className="centered-container">
      <button onClick={dispatchUploadEvent} type="button">
        تحميل
      </button>
    </div>
  );
}
