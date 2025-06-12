export const fetchQuestions = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,continents,flags');
        
        if (!response.ok) {
            throw new Error('Please try again.');
        }

        const data = await response.json();
        const validCountries = data.filter(
            (c) =>
                c.capital && c.capital.length > 0 &&
                c.name?.common &&
                c.flags?.svg &&
                c.continents?.length > 0
        );

        const shuffled = validCountries.sort(() => 0.5 - Math.random()).slice(0, 10); // limit to 10

        const questions = shuffled.map((country, index) => {
            const questionType = ["capital", "flag", "continent"][Math.floor(Math.random() * 3)];

            if (questionType === "capital") {
                const correct = country.capital[0];
                const options = validCountries
                    .filter(c => c.capital[0] !== correct)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3)
                    .map(c => c.capital[0]);

                const answers = [...options, correct].sort(() => 0.5 - Math.random());
                return {
                    id: index + 1,
                    type: "capital",
                    question: `What is the capital of ${country.name.common}?`,
                    answers,
                    correctAnswer: answers.indexOf(correct),
                    flag: country.flags.svg,
                };
            } else if (questionType === "flag") {
                const correct = country.name.common;
                const options = validCountries
                    .filter(c => c.name.common !== correct)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3)
                    .map(c => c.name.common);

                const answers = [...options, correct].sort(() => 0.5 - Math.random());
                return {
                    id: index + 1,
                    type: "flag",
                    question: "Which country does this flag belong to?",
                    answers,
                    correctAnswer: answers.indexOf(correct),
                    flag: country.flags.svg,
                };
            } else if (questionType === "continent") {
                const correct = country.continents[0];
                const allContinents = [...new Set(validCountries.map(c => c.continents[0]))];
                const options = allContinents
                    .filter(c => c !== correct)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);

                const answers = [...options, correct].sort(() => 0.5 - Math.random());
                return {
                    id: index + 1,
                    type: "continent",
                    question: `Which continent is ${country.name.common} in?`,
                    answers,
                    correctAnswer: answers.indexOf(correct),
                    flag: country.flags.svg,
                };
            }
        });

        return questions;
    } catch (error) {
        throw new Error(`Failed to load quiz questions. ${error.message}`);
    }
};
