// Egyszerű mock adat
export default function handler(req, res) {
  const parcels = Array.from({length: 90}).map((_, i) => {
    const size = ['S','M','L'][Math.floor(Math.random()*3)];
    const sizePx = size === 'S' ? 30 : size === 'M' ? 50 : 70;
    return {
      id: i+1,
      x: Math.floor(Math.random() * 1200) + 50,
      y: Math.floor(Math.random() * 600) + 50,
      size,
      sizePx,
      price: sizePx*150, // egyszerű példa: nagyobb terület drágább
      occupied: Math.random() < 0.2, // 20% foglalt
      hexPoints: '15,0 30,8 30,23 15,30 0,23 0,8'
    }
  })
  res.status(200).json(parcels)
}
