import { useEffect, useState } from 'react'
import './Meme.css'

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg",
    })
    
    const [allMemes, setAllMemes] = useState()

    useEffect(() => {
        async function getData(){
            const response = await fetch("https://api.imgflip.com/get_memes")
            const data = await response.json()
            setAllMemes(data.data.memes)
        }
        getData()
    }, [meme])

    function changeText(event) {
        const { name, value } = event.target
        setMeme((prevText) => {
            return {
                ...prevText,
                [name]: value
            }
        })
    }

    function getMemeImg(event) {
        event.preventDefault()
        const memesArray = allMemes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        let url = memesArray[randomNumber].url

        setMeme((prevMeme) => {
            return {
                ...prevMeme,
                randomImage: url
            }
        })
    }

    return (
        <section className='meme-section'>
            <form>
                <div className="text-inputs">
                    <div className='inputs-div'>
                        <label htmlFor="top-input">Top Text</label>
                        <input
                            id="top-input"
                            type="text"
                            placeholder="Shut up"
                            name="topText"
                            onChange={changeText}
                            value={meme.topText}
                        />
                    </div>
                    <div className='inputs-div'>
                        <label htmlFor="bottom-input">Bottom Text</label>
                        <input
                            id="bottom-input"
                            type="text"
                            placeholder="And take my money"
                            name="bottomText"
                            onChange={changeText}
                            value={meme.bottomText}
                        />
                    </div>
                </div>
                <input type="submit" value="Get a new meme image 🖼️" className='submit-button' onClick={getMemeImg} />
            </form>
            <div className='meme'>
                <img src={meme.randomImage} alt='meme' className='meme-image' />
                <h2 className='meme-text top'>{meme.topText}</h2>
                <h2 className='meme-text bottom'>{meme.bottomText}</h2>
            </div>
        </section>
    )
}