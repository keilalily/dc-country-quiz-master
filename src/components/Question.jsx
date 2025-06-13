import { assets } from "../assets/assets";

function Question({
    question,
    questionIndex,
    totalQuestions,
    userAnswers,
    onSelectAnswer,
    onSelectQuestion,
}) {
    const errorImage = assets.errorImage;

    return (
        <div className='flex flex-col rounded-lg bg-panel/10 p-6 md:p-12 xl:py-16 xl:px-28 shadow-lg w-full gap-8'>
            <div className='grid grid-cols-5 md:grid-cols-10 gap-4'>
                {Array.from({ length: totalQuestions }).map((_, index) => {
                    const isCurrent = questionIndex === index;
                    const isAnswered = userAnswers[index] !== undefined;

                    return (
                        <button
                            key={index}
                            className={`w-12 h-12 rounded-full text-sm transition-colors cursor-pointer
                                ${isAnswered ? 'gradient' : 'bg-panel/10'}
                                ${isCurrent ? 'gradient' : ''}
                                hover:bg-gradient-to-r hover:from-gradient-start hover:to-gradient-end
                                cursor-pointer
                            `}
                            onClick={() => onSelectQuestion(index)}
                        >
                            {index + 1}
                        </button>
                    )
                    
                })}
            </div>
            <div className='flex items-center justify-center text-xl'>
                <p className='flex items-center justify-center text-center gap-4'>
                    {question.question}
                    {question.type === "flag" && (
                        <img
                            loading="lazy"
                            src={question.flag}
                            alt="Country flag"
                            onError={(e) => {
                                e.target.onError = null;
                                e.target.src = errorImage;
                            }}
                            className="w-10 h-6 object-cover mx-auto my-4"
                        />
                    )}
                </p>
            </div>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-center'>
                {question.answers.map((answer, index) => {  
                    const userAnswer = userAnswers[questionIndex];
                    const isSelected = userAnswer === index;
                    const isCorrectAnswer = index === question.correctAnswer;
                    const hasAnswered = userAnswer !== undefined;

                    let statusIcon = null;
                    if (hasAnswered) {
                        if (isCorrectAnswer) {
                            statusIcon = (
                                <img
                                    loading="lazy"
                                    src={assets.check}
                                    alt="Correct"
                                    className='w-5 h-5'
                                />
                            )
                        } else if (isSelected && !isCorrectAnswer) {
                            statusIcon = (
                                <img
                                    loading="lazy"
                                    src={assets.close}
                                    alt="Incorrect"
                                    className='w-5 h-5'
                                />
                            )
                        }
                    }

                    return (
                        <li
                            key={index}
                            onClick={() => !hasAnswered && onSelectAnswer(questionIndex, index)}
                            className={`flex gap-2 justify-center items-center text-center bg-panel/10 px-4 py-5 rounded-lg
                                ${isSelected ? 'gradient' : ''}
                                ${!hasAnswered ? 'hover:bg-gradient-to-r hover:from-gradient-start hover:to-gradient-end hover:cursor-pointer' : 'opacity-80 cursor-default'}
                            `}
                        >
                            <span>{answer}</span>
                            {statusIcon}
                        </li>
                    )
                    
                })}
            </ul>
        </div>
    )
}

export default Question;
