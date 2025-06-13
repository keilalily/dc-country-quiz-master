import { assets } from "../assets/assets";

export default function Congratulations({ score, totalQuestions, onRestart }) {
    return (
        <div className='flex flex-col text-center items-center justify-center gap-4 p-6 pb-10 max-w-sm bg-panel/20 rounded-lg shadow-lg'>
            <img
                loading="lazy"
                src={assets.congrats}
                alt="Congratulatory image"
                className='w-full h-full'
            />
            <h2 className='text-2xl font-medium text-primary'>Congrats! You completed the quiz.</h2>
            <p className='text-lg text-primary font-regular'>
                You answer {score}/{totalQuestions} correctly
            </p>
            <div className='flex items-center justify-center py-6 w-3/4'>
                <button
                    type="button"
                    onClick={onRestart}
                    className='gradient w-full py-4 text-white text-base rounded-lg cursor-pointer transition-all duration-300 hover:opacity-80'
                >
                    Play Again
                </button>
            </div>
        </div>
    )
}