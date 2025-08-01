import { useRef, useEffect, useState, useMemo } from "react"

const Wordle = () => {
    const wordsWithHints = [
  { word: "apple", wordHint: "A fruit that's red or green." },
  { word: "baker", wordHint: "A person who makes bread." },
  { word: "chess", wordHint: "A strategic board game." },
  { word: "clock", wordHint: "It tells the time." },
  { word: "crisp", wordHint: "Something fresh or crunchy." },
  { word: "eagle", wordHint: "A large bird of prey." },
  { word: "flame", wordHint: "What you see in a fire." },
  { word: "globe", wordHint: "A spherical model of Earth." },
  { word: "grape", wordHint: "A small round fruit in clusters." },
  { word: "knock", wordHint: "A sound made on a door." },
  { word: "lemon", wordHint: "A sour yellow fruit." },
  { word: "march", wordHint: "The month after February." },
  { word: "model", wordHint: "A person or thing used for display." },
  { word: "ocean", wordHint: "A large body of salt water." },
  { word: "piano", wordHint: "A musical instrument with keys." },
  { word: "plane", wordHint: "An aircraft that flies." },
  { word: "queen", wordHint: "A female royal." },
  { word: "river", wordHint: "A flowing body of water." },
  { word: "sheep", wordHint: "An animal with wool." },
  { word: "slide", wordHint: "A playground feature to go down." },
  { word: "stone", wordHint: "A small rock." },
  { word: "tiger", wordHint: "A large striped wild cat." },
  { word: "toast", wordHint: "Crispy bread, often buttered." },
  { word: "trace", wordHint: "To follow or find." },
  { word: "vapor", wordHint: "Water in gas form." },
  { word: "whale", wordHint: "A large sea mammal." },
  { word: "wheat", wordHint: "A grain used in bread." },
  { word: "zebra", wordHint: "A striped animal." },
  { word: "adapt", wordHint: "To adjust to new conditions." },
  { word: "blaze", wordHint: "A bright fire or light." },
  { word: "brave", wordHint: "Showing courage." },
  { word: "cargo", wordHint: "Goods carried by a ship or truck." },
  { word: "dairy", wordHint: "Products made from milk." },
  { word: "ember", wordHint: "A small glowing piece of coal or wood." },
  { word: "fable", wordHint: "A short story with a moral." },
  { word: "gleam", wordHint: "A faint or brief light." },
  { word: "grain", wordHint: "A small particle or cereal crop." },
  { word: "haste", wordHint: "Excessive speed or urgency." },
  { word: "ivory", wordHint: "A hard, white material from tusks." },
  { word: "jolly", wordHint: "Cheerful and lively." },
  { word: "laser", wordHint: "A device that emits a focused light." },
  { word: "mirth", wordHint: "Amusement, usually expressed in laughter." },
  { word: "niece", wordHint: "Your sibling's daughter." },
  { word: "oasis", wordHint: "A fertile spot in a desert." },
  { word: "pearl", wordHint: "A smooth, shiny gem from oysters." },
  { word: "quilt", wordHint: "A stitched blanket." },
  { word: "radar", wordHint: "A system for detecting objects." },
  { word: "snail", wordHint: "A slow-moving mollusk with a shell." },
  { word: "thorn", wordHint: "A sharp projection on a plant." },
  { word: "upset", wordHint: "To make someone feel unhappy." },
  { word: "valve", wordHint: "A device controlling fluid flow." },
  { word: "yield", wordHint: "To give way or produce something." },
  { word: "adapt", wordHint: "To adjust to a new condition." },
  { word: "bloom", wordHint: "A flower in full display." },
  { word: "crust", wordHint: "The outer layer of bread." },
  { word: "dwelt", wordHint: "To live or reside somewhere." },
  { word: "flood", wordHint: "An overflow of water." },
  { word: "glaze", wordHint: "A glossy coating." },
  { word: "haste", wordHint: "Excessive speed in movement." },
  { word: "liver", wordHint: "An organ in the body." },
  { word: "meant", wordHint: "Intended or planned." },
  { word: "noble", wordHint: "Of high birth or rank." },
  { word: "occur", wordHint: "To happen or take place." },
  { word: "pouch", wordHint: "A small bag or pocket." },
  { word: "quill", wordHint: "A feather used as a pen." },
  { word: "rebel", wordHint: "One who resists authority." },
  { word: "scarf", wordHint: "A cloth worn around the neck." },
  { word: "tilde", wordHint: "A small squiggly line (~)." },
  { word: "umbra", wordHint: "The darkest part of a shadow." },
  { word: "vinyl", wordHint: "A type of plastic material." },
  { word: "whisk", wordHint: "To beat or mix quickly." },
  { word: "yeast", wordHint: "Used in baking for rising dough." },
  { word: "zesty", wordHint: "Full of flavor or energy." },
  { word: "awful", wordHint: "Very bad or unpleasant." },
  { word: "blend", wordHint: "To mix thoroughly." },
  { word: "clash", wordHint: "A conflict or fight." },
  { word: "drift", wordHint: "To be carried along by a current." },
  { word: "exile", wordHint: "Forced absence from one's country." },
  { word: "fetch", wordHint: "To go and bring back something." },
  { word: "glean", wordHint: "To collect bit by bit." },
  { word: "hoard", wordHint: "To store up, save." },
  { word: "inlet", wordHint: "A small opening or entry." },
  { word: "jumpy", wordHint: "Easily startled." },
  { word: "kiosk", wordHint: "A small open-fronted hut or booth." },
  { word: "leash", wordHint: "A strap for guiding animals." },
  { word: "mirth", wordHint: "Amusement or laughter." },
  { word: "nylon", wordHint: "A synthetic fabric." },
  { word: "orbit", wordHint: "The path of an object in space." },
  { word: "pinto", wordHint: "A horse with spots or patches." },
  { word: "quash", wordHint: "To suppress completely." },
  { word: "raven", wordHint: "A large black bird." },
  { word: "scold", wordHint: "To reprimand angrily." },
  { word: "throb", wordHint: "To beat or pulse with intensity." },
    ]
    const rows = 5, cols = 6
    const [counter, setCounter] = useState(0)
    const [tries, setTries] = useState(0)
    const [won, setWon] = useState(false)
    const [currWord, setCurrWord] = useState("")
    let index = useMemo(()=>Math.floor(Math.random() * wordsWithHints.length),[])
    const wordOfDay = useMemo(()=>wordsWithHints[index].word,[])
    const hint = useMemo(()=>wordsWithHints[index].wordHint,[])

    const gridsRef = useRef([])
    console.log(wordOfDay)
    
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                CheckWord()
            } else if (e.key === 'Backspace') {
                setCurrWord(prev => prev.substring(0,prev.length-2))
                Back()
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                setCurrWord(prev => prev+e.key.toLowerCase())
                InsertLetter(e.key.toUpperCase())
            }
        }
        document.addEventListener("keydown", handleKeyPress)
        return () => document.removeEventListener("keydown", handleKeyPress)
    }, [counter, tries, won, wordOfDay])

    function CheckWord() {
        console.log(currWord)
        if (currWord === wordOfDay){
            setWon(true)
            setTimeout(() => {
                alert("You won")
                location.reload()
            }, 1000);
        } else setCurrWord("")

        setTries(prev => prev+1)
    }

    function InsertLetter(letter) {
        let upperLimit = (tries*cols) + cols-1 - tries

        if (counter < upperLimit){
            gridsRef.current[counter].textContent = letter
            setCounter(prev => prev + 1)
        }
    }

    function Back() {
        if (counter > tries * cols) {
            setCounter(prev => prev - 1);
            gridsRef.current[counter - 1].textContent = "";
        }
    }

    useEffect(() => {
        if (!won && tries === rows+1) {
            setTimeout(() => {
                alert("You lost!")
                location.reload()
            }, 1000)
        }
    }, [tries, won])

    return (
        <div className="h-screen bg-gray-900 flex flex-col gap-4 justify-center items-center">
            <h1 className="text-5xl text-yellow-400 font-bold">Guess The Word</h1>
            <div className="grid grid-rows-6 grid-cols-5 border border-solid border-white">
                {
                    Array(rows * cols).fill(null).map((_, i) => (
                        <div
                            key={i}
                            ref={el => (gridsRef.current[i] = el)}
                            className="w-[70px] h-[70px] border border-solid border-white transition-all flex justify-center items-center text-2xl text-white uppercase"
                        ></div>
                    ))
                }
            </div>
            <div className="space-x-10">
                <button className="text-lg py-2 px-4 text-white bg-green-500 outline-none border-none rounded hover:bg-green-600 transition" onClick={CheckWord}>Enter</button>
                <button className="text-lg py-2 px-4 text-white bg-red-500 outline-none border-none rounded hover:bg-red-600 transition" onClick={Back}>Back</button>
                <button id="replay" className="text-lg py-2 px-4 text-white bg-blue-500 outline-none border-none rounded hover:bg-blue-600 transition" onClick={()=>{
                    location.reload()
                }}>Replay</button>
            </div>
            <h3 className="text-3xl text-yellow-400 font-bold">Word Hint: {hint}</h3>
        </div>
    )
}

export default Wordle
