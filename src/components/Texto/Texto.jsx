
import { useLocation } from 'react-router-dom';

const Texto = () => {
  const location = useLocation();
  const { color, text } = location.state || {};  // Recuperar los parámetros de estado

  return (
    <div style={{ color: color }}>
      <br /><br /><br /><br />
      <h1 className="text-center">{text}</h1>
    </div>
  );
};

export default Texto;
