import { createContext, useContext, useState } from "react";

const Notification = ({ message, severity, onClose }) => {
  const background = {
    success: "green",
    danger: "red",
    warning: "orange",
    default: "blue",
  };

  const notificationStyles = {
    position: "relative",
    marginBottom: "10px",
    padding: "15px 20px",
    backgroundColor: background[severity] || background.default,
    color: "white",
    borderRadius: "8px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    maxWidth: "300px",
  };

  const buttonStyles = {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div style={notificationStyles}>
      <span>{message}</span>
      <button style={buttonStyles} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const setNotification = (severity, message) => {
    const id = Date.now(); // Generar un ID único para cada notificación
    setNotifications((prev) => [...prev, { id, severity, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 3000);
  };

  const closeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const containerStyles = {
    position: "fixed",
    bottom: 20,
    right: 20,
    display: "flex",
    flexDirection: "column-reverse", // Mostrar las notificaciones más recientes abajo
    alignItems: "flex-end",
    gap: "10px",
    zIndex: 9999,
  };

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      <div style={containerStyles}>
        {notifications.map(({ id, severity, message }) => (
          <Notification
            key={id}
            severity={severity}
            message={message}
            onClose={() => closeNotification(id)}
          />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
