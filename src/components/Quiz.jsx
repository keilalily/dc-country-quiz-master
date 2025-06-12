import { useState, useEffect, useMemo } from "react";
import { fetchQuestions } from "../api/fetchService";
import { assets } from "../assets/assets";
import Congratulations from "./Congratulations";
import Question from "./Question";

export default function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const getQuestions = async () => {
        try {
            const data = await fetchQuestions();
            setQuestions(data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }

    useEffect(() => {
        getQuestions();
    }, []);

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleAnswer = (questionIndex, answerIndex) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[questionIndex] = answerIndex;
        setUserAnswers(updatedAnswers);
        setTimeout(() => {
            handleNextQuestion();
        }, 3000);
    };

    const handleRestartQuiz = () => {
        setQuestions([]);
        setCurrentQuestion(0);
        setUserAnswers([]);
        setShowResult(false);
        getQuestions();
    };

    const score = useMemo(() => {
        return userAnswers.filter(
            (answer, index) => answer === questions[index]?.correctAnswer
        ).length;
    }, [userAnswers, questions]);

    return (
        <div className='flex flex-col items-center justify-center w-full text-primary'>
            {showResult ? (
                <Congratulations
                    score={score}
                    totalQuestions={questions.length}
                    onRestart={handleRestartQuiz}
                />
            ) : (
                <div className='flex flex-col items-center justify-center gap-8 w-full lg:w-1/2'>
                    <div className='flex justify-between items-center w-full'>
                        <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-start'>Country Quiz</h1>
                        <span className='gradient flex justify-between text-sm md:text-base w-fit items-center gap-2 rounded-full px-4 py-1'>
                            🏆 {score}/{questions.length} Points
                        </span>
                    </div>
                    {questions.length > 0 && questions[currentQuestion] ? (
                        <Question
                            question={questions[currentQuestion]}
                            questionIndex={currentQuestion}
                            totalQuestions={questions.length}
                            userAnswers={userAnswers}
                            onSelectAnswer={handleAnswer}
                            onSelectQuestion={setCurrentQuestion}
                        />
                    ) : (
                        <p className='w-full py-8 rounded-lg bg-panel/20 flex items-center justify-center text-primary text-lg'>
                            Loading questions...
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}