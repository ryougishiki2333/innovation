import { useEffect, useState } from 'react';
import './app.css';
import rocketImg from './assets/ic_shejipao@2x.png'; // 确保正确地导入了火箭图片

const RocketAnimation = () => {
  const [rockets, setRockets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRockets = Array.from({ length: 10 }).map(() => {
        // 随机选择一个边界
        const edge = Math.floor(Math.random() * 4);
        let x = 0, y = 0;
        switch (edge) {
          case 0: // 顶边
            x = Math.random() * 500;
            y = 0;
            break;
          case 1: // 右边
            x = 500;
            y = Math.random() * 500;
            break;
          case 2: // 底边
            x = Math.random() * 500;
            y = 500;
            break;
          case 3: // 左边
            x = 0;
            y = Math.random() * 500;
            break;
          default:
            break;
        }
        const angle = Math.atan2(250 - y, 250 - x) * 180 / Math.PI + 90;
        return { x, y, angle, id: Math.random() };
      });
      setRockets(prevRockets => [...prevRockets, ...newRockets]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {rockets.map(rocket => (
        <img
          key={rocket.id}
          src={rocketImg}
          className="rocket"
          style={{ 
            left: `${rocket.x}px`, 
            top: `${rocket.y}px`, 
            transform: `rotate(${rocket.angle}deg)`,
            '--rotate': `${rocket.angle}deg` // 设置 CSS 变量
          }}
        />
      ))}
    </div>
  );
};

export default RocketAnimation;