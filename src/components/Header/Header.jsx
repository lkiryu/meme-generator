import trollface from '../../assets/trollface.png'
import './Header.css'

export default function Header(){
    return(
        <header className='header'>
            <img src={trollface} alt="trollface" className='logo'/>
            <h2 className='title'>Meme Generator</h2>
        </header>
    )
}