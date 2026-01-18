// components/SocialLinks.js
export default function SocialLinks() {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      display: 'flex',
      gap: '10px',
      zIndex: 10
    }}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/facebook.png" alt="Facebook" width={30}/>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/instagram.png" alt="Instagram" width={30}/>
      </a>
      <a href="https://x.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/x.png" alt="X" width={30}/>
      </a>
    </div>
  )
}
